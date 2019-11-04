const csv = require("csvtojson");
const lodash = require("lodash");

let csvdataJson = {};
let metadataJson = {};

module.exports = function upload(req, res) {
    let fileData = String(req.body.csvdata);
    let metadataFileData = String(req.body.metadata);
    // console.log('something',req.body.csvdata);  
    // console.log('something',req.body.metadata); 
    // fileData = 'a,b,c<br>1,2,3<br>4,5,6';

    fileData = fileData.replace(/<br>/g, '\n');
    // console.log(fileData);

    metadataFileData = metadataFileData.replace(/<br>/g, '\n');
    // console.log('metadataFileData',metadataFileData);

    csv({ delimiter: "|" })
        .fromString(metadataFileData)
        .then((json) => {
            metadataJson = { ...json };
            // console.log('metadataJson', metadataJson);
        });

    csv()
        .fromString(fileData)
        .then((json) => {
            // console.log('json inside', JSON.stringify(json));
            csvdataJson = { ...json };
            // console.log('csvdataJson', csvdataJson);
            let finalBurndown = getBurnDownData(metadataJson, csvdataJson);

            // res.json("Received Data, the sum is: " + finalBurndown);
            res.send(finalBurndown);
        })
        .catch(err => {
            res.status(400).json("God knows what this error is: " + err);
        });
}

function sumVal(arr) {
    let val = arr.reduce((a, b) => Number(a) + Number(b), 0);
    return val;
}

function getBurnDownData(pMetadataJsonData, pCsvJsonData) {
    console.log('Calculating Burn down data');
    let burndown = [];
    let burndown_ms = [];
    let burndown_enhancement = [];
    let burndownData = [];
    let sum = 0;
    let sum_enhancement = 0;
    const monthNames = ["Jan", "Feb", "March", "April", "May", "June","July"
                        , "Aug", "Sept", "Oct", "Nov", "Dec"];
    let d = new Date();
    let month = monthNames[d.getMonth()];
    let year = d.getFullYear();
    let clientList = [];

    let managedServices = lodash.filter(pMetadataJsonData, { 'Support Type': 'N' });
    let enhancements = lodash.filter(pMetadataJsonData, { 'Support Type': 'R' });

    // console.log('managedServices', managedServices);

    // clientList = pMetadataJsonData.map(timekeeper => timekeeper['Client Name']);
    // clientList = lodash.uniq(clientList);

    burndownData = lodash.map(managedServices, (jsonValue, jsonKey) => {
        let clientArray = [];
        // console.log(jsonValue['Client Name'], ' - ', jsonValue['Assignment Name'], ' - ', jsonValue['Support Type']);
        burndown = lodash.filter(pCsvJsonData, { 'Client Name': jsonValue['Client Name'], 'Assignment Name': jsonValue['Assignment Name'] });
        
        console.log('burndown', burndown);

        // burndown_ms = burndown.filter(bd => {
        //     if(managedServices.map(timekeeper => timekeeper['Assignment Name']).includes(bd['Assignment Name'])) {
        //         return bd['Assignment Name'];
        //     }
        // });

        burndown_enhancement = lodash.filter(pCsvJsonData, { 'Client Name': jsonValue['Client Name']});
        burndown_enhancement = burndown_enhancement.filter(bd => {
            if(enhancements.map(timekeeper => timekeeper['Assignment Name']).includes(bd['Assignment Name'])) {
                return bd['Assignment Name'];
            }
        });

        burndown_ms = burndown.map(timekeeper => timekeeper['ToBill_Hrs']);
        sum = sumVal(burndown_ms);

        burndown_enhancement = burndown_enhancement.map(timekeeper => timekeeper['ToBill_Hrs']);
        sum_enhancement = sumVal(burndown_enhancement);

        // console.log('Sum by each:: ', sum);

        clientArray.push({ 'value': jsonValue['Client Name'] });
        clientArray.push({ 'value': jsonValue['Budgeted Hours'] });
        // clientArray.push({'value': jsonValue['Assignment Name']});
        // clientArray.push({'value': jsonValue['Support Type']});
        clientArray.push({ 'value': sum });
        clientArray.push({ 'value': Number(jsonValue['Budgeted Hours']) - sum });
        clientArray.push({ 'value': sum_enhancement });
        clientArray.push({ 'value': 0 });
        clientArray.push({ 'value': 0 });

        return clientArray;
    });

    // burndownData.unshift([{value: 'Client Name'}, {value: 'Assignment Name'}, {value: 'Support Type'}, {value: 'Total Hours'}]);
    burndownData.unshift([{ value: 'Client Name' }
        , { value: 'Budgeted Hours' }
        , { value: 'Utilized Support hours' }
        , { value: 'Remaining support hours' }
        , { value: 'Reports development hours' }
        , { value: 'Standard Development hours' }
        , { value: 'Tickets created in ' + month + '-' + year }
    ]);

    // console.log('burndownData', burndownData);
    return burndownData;
}
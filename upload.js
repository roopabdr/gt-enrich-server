const csv = require("csvtojson");
const lodash = require("lodash");

let jsonData = {};

module.exports = function upload(req, res) {
    let fileData = String(req.body.csvdata);
    // console.log('something',req.body.csvdata);

    // fileData = 'a,b,c<br>1,2,3<br>4,5,6';
    fileData = fileData.replace(/<br>/g, '\n');
    // console.log(fileData);
    csv()
        .fromString(fileData)
        .then((json) => {
            // console.log('json inside', JSON.stringify(json));
            jsonData = { ...json };
            metadataJson = jsonData.metadata;
            csvdataJson = jsonData.csvdata;
            let sum = getBurnDownData(metadataJson, csvdataJson);

            res.json("Received Data, the sum is: " + sum);
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
    console.log('Calculating Burn down data', pMetadataJsonData);
    let burndown = lodash.filter(pCsvJsonData, { 'Client Name': 'Sundt Construction', 'Assgn Name': 'Managed Services' });
    burndown = burndown.map(timekeeper => timekeeper['Base Hours']);
    // console.log(burndown);
    let sum = sumVal(burndown);
    console.log(sum);
    return sum;
}
const csv = require("csvtojson");
const lodash = require("lodash");
const request = require('request');

let jsonData = {};
exports.jsonData = jsonData;
var test = 'Tesing Data';
exports.test = test;

module.exports = function upload(req, res) {
    let fileData = String(req.body.csvdata);
    // console.log('something',req.body.csvdata);

    // fileData = 'a,b,c<br>1,2,3<br>4,5,6';
    fileData = fileData.replace(/<br>/g, '\n');
    // console.log(fileData);
    csv()
        .fromString(fileData)
        .then((json) => {
            // console.log('json inside', json[0]);
            jsonData = { ...json };
            let sum = getBurnDownData(jsonData);

            if (jsonData != null) {
                request.get('http://localhost:5000/download/', (err, res, body) => {
                    if (err) {
                        return console.log("Awww, snap !!", err);
                    }
                    console.log("Downloaded file", res.body);
                });
            }

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

function getBurnDownData(pJsonData) {
    console.log('hey, there');
    let burndown = lodash.filter(pJsonData, { 'Client Name': 'Sundt Construction', 'Assgn Name': 'Managed Services' });
    burndown = burndown.map(timekeeper => timekeeper['Base Hours']);
    // console.log(burndown);
    let sum = sumVal(burndown);
    console.log(sum);
    // downloadFile(pJsonData[0]);
    return sum;
}
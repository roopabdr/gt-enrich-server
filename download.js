// const fs = require("fs");
const XLSX = require('xlsx');
var test = require('./upload').test;
// const FileSaver = require('file-saver');
// const Blob = require('blob');

module.exports = function download(req, res) {
    const data =  [{ 'Time ID': '94913613',
    'Date': '09/02/2019',
    'Period': '202002',
    'Timekeeper Code': '53807',
    'Timekeeper Name': 'MK, Roopa',
    'Client Code': '9996606',
    'Client Name': 'GT: Holidays',
    'Assgn Code': '96651',
    'Assgn Name': 'GT: Holidays SSC',
    'Offc Code': '036',
    'SLine Code': '220',
    'Location Code': '035',
    'Location Desc': 'GT SSC India Office',
    'WIP Status': 'WIP',
    'Rate Method': '41',
    'Phase Code': '',
    'Task Code': '',
    'Flag': '1',
    'Base Hours': '8.00',
    'Base Amount': '$1040.00',
    'ToBill Hrs': '8.00',
    'ToBill Amount': '$0.00',
    'Standard Amount': '$1040.00',
    'Narrative': '' }];
  
    const wb = XLSX.utils.book_new();
    wb.SheetNames.push('TimeSheet');

    console.log('Here we go.....', 1);

    const ws = XLSX.utils.json_to_sheet(data);
    wb.Sheets['TimeSheet'] = ws;
    
    console.log('Here we go.....', 2);

    // res.setHeader('Content-Type', 'application/octet-stream');
    // res.setHeader('Content-Disposition', 'attachment; filename='+ 'test.xlx');
    // const wbout = XLSX.writeFile(wb, 'test.xlsx');
    // return wbout;

    console.log('Others', test);
    res.send("Hellloooo");
}

function dowloadFile(){
    // let data = "New File Contents";
    // console.log(process.cwd());
    // fs.writeFile("temp.txt", data, (err) => {
    //   if (err) console.log(err);
    //   console.log("Successfully Written to File.");
    // });
    console.log("testing");
}
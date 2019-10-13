const csv = require("csvtojson");
const lodash = require("lodash");
const fs = require("fs");

module.exports = function upload(req, res) {
    let fileData = String(req.body.csvdata);
    let jsonData = {};
    // console.log('something',req.body.csvdata);

    // let t=0;
    // fileData = 'a,b,c<br>1,2,3<br>4,5,6';
    fileData = fileData.replace(/<br>/g, '\n');
    // fileData = fileData.replace(/^/g, function (match) {
    //     t++;
    //     return (t % 3 === 0) ? "\n" : match;
    //   });
    // fileData = 'a,b,c\n1,2,3\n4,5,6';
    // console.log(fileData);
    csv()
        .fromString(fileData)
        .then((json) => {
            // console.log('json inside',json[0]);
            jsonData = { ...json };
            let sum = getBurnDownData(jsonData);
            // res.send("All OK, the sum is: "+ sum);
            res.json("Received Data, the sum is: " + sum);
        })
        .catch(err => {
            res.status(400).json("God knows what this error is: " + err);
        });
    // res.send('Stringified', JSON.stringify(jsonData[0]));
    // console.log(jsonData[0]);
    // res.status(200).json(JSON.stringify(jsonData[0].Date));
    // res.send('Sent');
}

function sumVal(arr) {
    let val = arr.reduce((a, b) => Number(a) + Number(b), 0);
    return val;
}

function getBurnDownData(jsonData) {
    console.log('hey, there');
    let burndown = lodash.filter(jsonData, { 'Client Name': 'Sundt Construction', 'Assgn Name': 'Managed Services' });
    burndown = burndown.map(timekeeper => timekeeper['Base Hours']);
    // console.log(burndown);
    let sum = sumVal(burndown);
    console.log(sum);
    // downloadFile(jsonData[0]);
    let data = "New File Contents";

    fs.writeFile("temp.txt", data, (err) => {
      if (err) console.log(err);
      console.log("Successfully Written to File.");
    });
    
    return sum;
}

function downloadFile(book_content) {
    const wb = XLSX.utils.book_new();
    wb.SheetNames.push('TimeSheet');

    const ws = XLSX.utils.json_to_sheet(book_content);
    wb.Sheets['TimeSheet'] = ws;

    const wbout = XLSX.writeFile(wb, 'test.xlsx');
    return wbout;
}
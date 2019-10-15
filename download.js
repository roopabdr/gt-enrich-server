const XLSX = require('xlsx');
// const LocalStorage = require('node-localstorage').LocalStorage;

module.exports = function download(req, res) {
    const data = JSON.parse(localStorage.getItem("TimeSheetDataKey"));

    const wb = XLSX.utils.book_new();
    wb.SheetNames.push('TimeSheet');

    console.log('Here we go.....', 1);

    const ws = XLSX.utils.json_to_sheet(data);
    wb.Sheets['TimeSheet'] = ws;

    console.log('Here we go.....', 2);

    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Disposition', 'attachment; filename=' + 'test.xlx');
    XLSX.writeFile(wb, 'C:/Users/us53807/Documents/Roopa/test.xlsx');

    // console.log('Others', localStorage.getItem("TimeSheetDataKey"));
    res.send("Hellloooo");
}
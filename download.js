const XLSX = require('xlsx');
const FileSaver = require('file-saver');
const Blob = require('blob');
const fs = require('fs');
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
    res.setHeader('Content-Disposition', 'attachment; filename=' + 'test.csv');
    // const wbout = 
    // XLSX.writeFile(wb, 'test.xlsx');
    let stream = XLSX.stream.to_csv(ws);
    stream.pipe(fs.createWriteStream("test.csv"));
    
    // res.download('/app/test.xlsx', 'https://roopabdr.github.io/gt-enrich/Book3.xlsx');
    // res.end();
    // const wbout = XLSX.write(wb, {bookType:'xlsx',  type: 'binary'});

    // FileSaver.saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), 'test.xlsx');

    // console.log('Others', localStorage.getItem("TimeSheetDataKey"));
    res.send();
}

const s2ab = (s) => {
    let buf = new ArrayBuffer(s.length);
    let view = new Uint8Array(buf);
    for(let i=0; i<s.length; i++){
        view[i] = s.charCodeAt(i) & 0xFF;
    }
    
    return buf;
}
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// const request = require('request');
const XLSX = require('xlsx');
const FileSaver = require('file-saver');
const Blob = require('blob');
const upload = require('./upload');
// const fs = require('fs');

const app = express();

app.use(bodyParser.json());
app.use(cors());


const workbook = XLSX.readFile('Book1.xlsx');
const sheet_name_list = workbook.SheetNames;
// console.log(XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]));
const book1_content = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);

const wb = XLSX.utils.book_new();
wb.SheetNames.push('TimeSheet');

const ws = XLSX.utils.json_to_sheet(book1_content);
wb.Sheets['TimeSheet'] = ws;

// const s2ab = (s) => {
//     let buf = new ArrayBuffer(s.length);
//     let view = new Uint8Array(buf);
//     for(let i=0; i<s.length; i++){
//         view[i] = s.charCodeAt(i) & 0xFF;
//     }
//     return buf;
// }

// const wbout = XLSX.write(wb, {bookType:'xlsx',  type: 'binary'});

// FileSaver.saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), 'test.xlsx');

// res.send('It is working');
app.get('/', (req, res) => {
    // res.json(book1_content);
    // res.setHeader('Content-Type', 'application/octet-stream');
    // res.setHeader('Content-Disposition', 'attachment; filename='+ 'test.xlx');
    // const wbout = XLSX.writeFile(wb, 'test.xlsx');
    // return wbout;
    // XLSX.writeFile(wb, 'Book3.xlsx');
    // res.send(book1_content);
});

app.post('/upload', upload);

// app.post('/uploading', function(req, res){
//     console.log('testing here');
//     console.dir(req.body.csvdata);
//     res.send("test");
// });

app.listen(process.env.PORT || 5000, () => {
	console.log(`app is running on port 5000`);
});
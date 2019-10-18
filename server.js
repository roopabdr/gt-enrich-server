const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// const XLSX = require('xlsx');
const upload = require('./upload');
const download = require('./download');
const test = require('./test');
// const fs = require('fs');

const app = express();

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    next();
});

// app.use(bodyParser.json());
app.use(bodyParser.json({ limit: '500mb' }));
app.use(cors());


// const workbook = XLSX.readFile('Book1.xlsx');
// const sheet_name_list = workbook.SheetNames;
// const book1_content = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);

// const wb = XLSX.utils.book_new();
// wb.SheetNames.push('TimeSheet');

// const ws = XLSX.utils.json_to_sheet(book1_content);
// wb.Sheets['TimeSheet'] = ws;

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
//cors(corsOptions), 
app.get('/', (req, res) => {
    // res.setHeader('Content-Type', 'application/octet-stream');
    // res.setHeader('Content-Disposition', 'attachment; filename='+ 'test.xlx');
    // const wbout = XLSX.writeFile(wb, 'test.xlsx');
    // return wbout;    
    res.send('Hello, World!');
});

app.get('/download', download);

app.get('/test', test);

app.post('/upload', upload);

app.listen(process.env.PORT || 5000, () => {
    console.log(`app is running on port 5000`);
});
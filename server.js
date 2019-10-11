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

// hard coded configuration object
conf = {
    // look for PORT environment variable,
    // else look for CLI argument,
    // else use hard coded value for port 5000
    port: process.env.PORT || process.argv[2] || 5000,
 
    // origin undefined handler
    // see https://github.com/expressjs/cors/issues/71
    originUndefined: function (req, res, next) {
 
        if (!req.headers.origin) {
 
            res.json({
 
                mess: 'Hi you are visiting the service locally. If this was a CORS the origin header should not be undefined'
 
            });
 
        } else {
 
            next();
 
        }
 
    },
 
    // Cross Origin Resource Sharing Options
    cors: {
 
        // origin handler
        origin: function (origin, cb) {
 
            // setup a white list
            let wl = ['https://roopabdr.github.io/gt-enrich/'];
 
            if (wl.indexOf(origin) != -1) {
 
                cb(null, true);
 
            } else {
 
                cb(new Error('invalid origin: ' + origin), false);
 
            }
 
        },
 
        optionsSuccessStatus: 200
 
    }
 
};

app.use(bodyParser.json());
// app.use(cors());
// use origin undefined handler, then cors for all paths
app.use(conf.originUndefined, cors(conf.cors));


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
    res.send('Hello');
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
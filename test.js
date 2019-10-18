const Blob = require('blob');
const fs = require('fs');
const request = require('request');

module.exports = function test(req, res) {
    // downloadFile('TESTING', 'File download from NodeJS', 'text/plain', 'txt');
    const file = fs.createWriteStream("node.png");    
    request.get("https://cdn.pixabay.com/photo/2015/04/23/17/41/node-js-736399_960_720.png", function (err, res, body) {
        res.setHeader('Content-Disposition', 'attachment; filename=' + 'tetatee.png');
        res.pipe(file);
    });

    // res.send('***** Hello, there ****');
    console.log('***** Hello, there ****');
    res.send();
}

function downloadFile (filename, content, content_type, file_extension) {
    const element = document.createElement("a");
    const file = new Blob([content], {type: content_type});
    element.href = URL.createObjectURL(file);
    element.download = `${filename}.${file_extension}`;
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  }
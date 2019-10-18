const Blob = require('blob');

module.exports = function test(req, res) {
    downloadFile('TESTING', 'File download from NodeJS', 'text/plain', 'txt');
    res.send('***** Hello, there ****');
}

function downloadFile (filename, content, content_type, file_extension) {
    const element = document.createElement("a");
    const file = new Blob([content], {type: content_type});
    element.href = URL.createObjectURL(file);
    element.download = `${filename}.${file_extension}`;
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  }
const csv=require("csvtojson");
// const csvtojsonV2=require("csvtojson/v2");

module.exports = function upload(req, res) {
    let fileData = String(req.body.csvdata);
    // console.log('something',req.body.csvdata);
    
    let t=0;
    // fileData = 'a,b,c,1,2,3,4,5,6';    
    fileData = fileData.replace(/,/g, function (match) {
        t++;
        return (t % 24 === 0) ? "\n" : match;
      });
    // fileData = 'a,b,c\n1,2,3\n4,5,6';
    console.log(fileData);
    csv()
    .fromString(fileData)
    .then((json)=>{
        console.log('json inside',json); 
    });
    res.send('Stringified');
}
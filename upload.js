const csv=require("csvtojson");
// const csvtojsonV2=require("csvtojson/v2");

module.exports = function upload(req, res) {
    let fileData = String(req.body.csvdata);
    // console.log('something',req.body.csvdata);
    
    let t=0;
    // fileData = 'a,b,c<br>1,2,3<br>4,5,6';
    fileData = fileData.replace(/<br>/g,'\n');
    // fileData = fileData.replace(/^/g, function (match) {
    //     t++;
    //     return (t % 3 === 0) ? "\n" : match;
    //   });
    // fileData = 'a,b,c\n1,2,3\n4,5,6';
    // console.log(fileData);
    csv()
    .fromString(fileData)
    .then((json)=>{
        console.log('json inside',json[0]);
        // res.send("All OK");
        res.json(json[0]);
    })
    .catch(err => {
        res.status(400).json("God knows what this error is: "+err);
    });
    // res.send('Stringified', JSON.stringify(jsonData[0]));
    // console.log(jsonData[0]);
    // res.status(200).json(JSON.stringify(jsonData[0].Date));
    // res.send('Sent');
}
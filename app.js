//npm i express body-parser expess-fileupload tesseract.js
const express = require('express'), bodyParser = require('body-parser'),fileUpload = require('express-fileupload');
var app = express();
app.use(bodyParser.json());
app.use(fileUpload());

var cors = require('cors');

var corsOptions = {
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
}

app.options(corsOptions, cors())

const { createWorker } = require('tesseract.js')
const worker = createWorker()
const PSM = require('tesseract.js/src/constants/PSM.js')

const fs = require('fs')

app.post('/imgToText', async function (req, res) {
  let fileName=req.files.file.name;
  let imageFile = req.files.file;
  let file=`${__dirname}/img/${fileName}`;
  imageFile.mv(file, function(err) {
    if (err) {
      return res.status(500).send(err);
    }
    getTextFromImage(file,req.body.lang).then(text=>{
      fs.unlinkSync(file);
      res.send(text);      
    });    
  });
});


app.get('/',function(req,res){
  res.sendFile(__dirname+'/index.html')
});

async function getTextFromImage(img,lang) {
  await worker.terminate
  await worker.load()
  await worker.loadLanguage(lang)
  await worker.initialize(lang)
  await worker.setParameters({tessedit_pageseg_mode: PSM.AUTO,})
  const { data: { text } } = await worker.recognize(img);
  await worker.terminate
  return text
}
var path = require('path');
app.use('/',express.static(path.resolve('./')));
app.listen(5000, (err) => {console.log(`running server on port: 5000`);});
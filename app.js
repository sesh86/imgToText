//npm i express body-parser expess-fileupload tesseract.js
const express = require('express'), bodyParser = require('body-parser'),fileUpload = require('express-fileupload');
var app = express();
app.use(bodyParser.json());
app.use(fileUpload());

const { createWorker } = require('tesseract.js')
const worker = createWorker()
const PSM = require('tesseract.js/src/constants/PSM.js')

app.post('/imgToText', async function (req, res) {
  const img=req.files.file.name;
  getTextFromImage(img).then(text=>{console.log(text);
    res.send(text);
  });
});

async function getTextFromImage(img) {
  await worker.terminate
  await worker.load()
  await worker.loadLanguage('eng')
  await worker.initialize('eng')
  await worker.setParameters({tessedit_pageseg_mode: PSM.AUTO,})
  const { data: { text } } = await worker.recognize(img);
  await worker.terminate
  return text
}

app.listen(5000, (err) => {console.log(`running server on port: 5000`);});
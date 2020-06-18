var fs = require("fs");
var pdfreader = require('pdfreader');
var fse=require('fs-extra');



var dirname = 'C:/Users/ssrinivasa040/Desktop/node/pocs/tool-pdf/movw';
fs.readdir(dirname, function (err, files) {
  files.forEach( function( file, index ) {
    console.log(file);
    if(file.indexOf('.pdf')>0){
    new pdfreader.PdfReader().parseFileItems(__dirname+'/movw/'+file, function(err, item){
      if (!item || item.page) {
        // end of file, or page
        // var y=printRows();
        // console.log(y+'y')

        if(printRows())  {
          fse.move(__dirname+'/movw/'+file, __dirname+'/new/'+file, function (err) {
            console.log('file moved');
          });
        }
        // console.log('PAGE:', item.page);
        rows = {}; // clear rows for next page
      }
      else if (item.text) {
        // accumulate text items into rows object, per line
        (rows[item.y] = rows[item.y] || []).push(item.text);
      }
    });
  }


  })
});

var rows = {}; // indexed by y-position

function printRows() {
  var br=0;
  Object.keys(rows) // => array of y-positions (type: float)
    .sort((y1, y2) => parseFloat(y1) - parseFloat(y2)) // sort float positions
    .forEach((y) =>{ var x=(rows[y] || []).join('');
      console.log(y)
      for(var i=2;i<process.argv.length;i++){
        if(x.indexOf(process.argv[i])>-1) {
          br=1;return true;
      }
    }});
  return br;
}

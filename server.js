var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var port = 5000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
var mbaUpload = require('./s3UploadMBA');
console.log(mbaUpload)
app.use('/', mbaUpload.routes);

var csUpload = require('./s3UploadCS');
console.log(csUpload)
app.use('/', csUpload.routes);

var artsUpload = require('./s3UploadArts');
console.log(artsUpload)
app.use('/', artsUpload.routes);

app.listen(port,function(err){
  if(err){
   console.log(" DB Error: ",err);
 }else{
   console.log('Port connected',port);
 }
});
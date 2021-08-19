const express = require( 'express' );
const aws = require( 'aws-sdk' );
const multerS3 = require( 'multer-s3' );
const multer = require('multer');
const path = require( 'path' );
const router = express.Router();
const s3 = new aws.S3({
  accessKeyId: 'AKIAQG7EENYZNKPCYXVM',
  secretAccessKey: '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',
  Bucket: 'artsactlibrary'
 });

 // CREATE MULTER FUNCTION FOR UPLOAD
var uploadv1 = multer({
  // CREATE MULTER-S3 FUNCTION FOR STORAGE
  storage: multerS3({
      s3: s3,
      acl: 'public-read',
      // bucket - WE CAN PASS SUB FOLDER NAME ALSO LIKE 'bucket-name/sub-folder1'
      bucket: 'artsactlibrary',
      metadata: function (req, file, cb) {
          cb(null, { fieldName: file.fieldname });
      },
      key: function (req, file, cb) {
          cb(null, file.originalname); 
      }
  }),
  limits: { fileSize: 1024 * 1024 * 50000 }, // 50000MB
  fileFilter: function(req, file, cb) {
    return cb(null, true);
  }
});

router.post('/api/photo3',uploadv1.array('galleryImage',1000),function(req,res){
  console.log('Uploaded!');
  res.send(req.files);
});
 module.exports = {
   routes:router
 }
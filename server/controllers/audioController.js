const AWS = require('aws-sdk');
const multer = require('multer');
const { memoryStorage } = require('multer');
const audioController = {};
const dotenv = require('dotenv');

const storage = memoryStorage();
const upload = multer({ storage });

const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const region = process.env.S3_REGION;
const Bucket = process.env.S3_BUCKET;

const s3 = new AWS.S3({
  accessKeyId,
  secretAccessKey
});


audioController.uploadAudio = async (req, res, next) => {

  const params = {
    Key: __filename,
    Bucket: Bucket,
    Body: file,
    ContentType: 'audio/mpeg'
  }

  return next();
}


module.exports = audioController;
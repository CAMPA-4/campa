const AWS = require('aws-sdk');
const dotenv = require('dotenv');
const { PutObjectCommand, S3Client } = require("@aws-sdk/client-s3");

const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const region = process.env.S3_REGION;
const Bucket = process.env.S3_BUCKET;

// const client = new S3Client({
//   credentials: {
//     accessKeyId,
//     secretAccessKey
//   },
//   region
// });

const s3 = new AWS.S3({
  accessKeyId,
  secretAccessKey
});

const audioController = {};

audioController.uploadAudio = async (req, res, next) => {
  try {
    const params = {
      Key: 'DIDWEDOIT2',
      Bucket: Bucket,
      Body: req.file.buffer,
      ContentType: 'audio/mpeg',
      ACL: 'public-read'
    }
    const link = s3.upload(params, (err, link) => {
      if (err) console.log('s3 error ' + err)
      else {
        res.locals.link = link;
        return next();
      }
    });
  } catch (err) {
    const errObj = {
      log: "audioController.uploadAudio had an error" + err,
      status: 400,
      message: { err: "An error occurred when uploading audio file" },
    };
    return next(errObj);
  }
}


module.exports = audioController;
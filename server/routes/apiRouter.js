const express = require("express");
const router = express.Router();
const { PutObjectCommand, S3Client } = require("@aws-sdk/client-s3");
const dotenv = require('dotenv');

const AWS = require('aws-sdk');
const multer = require('multer');
const { memoryStorage } = require('multer');

const storage = memoryStorage();
const upload = multer({ storage });
// const upload = multer();

const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const region = process.env.S3_REGION;
const Bucket = process.env.S3_BUCKET;

// const Controller = require('../controllers/Controller');
const audioController = require('../controllers/audioController');

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

const uploadAudio = (__filename, file) => {
  return new Promise((resolve, reject) => {
    const params = {
      Key: __filename,
      Bucket: Bucket,
      Body: file,
      ContentType: 'audio/mpeg',
      ACL: 'public-read'
    }

    s3.upload(params, (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data);
      };
    })

  });

}

const checkAudio = (req, res, next) => {
  console.log('Checking audioFile in req body', req.body.audioFile);
}

router.post('/uploadAudio', checkAudio, upload.single('audioFile'), async (req, res) => {
  const filename = 'DIDWEDOIT';
  console.log("We reached the audio file request");
  const file = req.file.buffer;
  try {
    const link = await uploadAudio(filename, file);
    res.status(200).send(link);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
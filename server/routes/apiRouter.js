const express = require("express");
const router = express.Router();

const dotenv = require('dotenv');
const { PutObjectCommand, S3Client } = require("@aws-sdk/client-s3");

const multer = require('multer');
const { memoryStorage } = require('multer');

const storage = memoryStorage();
const upload = multer({ storage });

const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const region = process.env.S3_REGION;
const Bucket = process.env.S3_BUCKET;

// const Controller = require('../controllers/Controller');
const audioController = require('../controllers/audioController');

const checkAudio = (req, res, next) => {
  console.log('Checking request body for audioFile and key', req.body);
  return next();
}

router.post('/uploadAudio', checkAudio, upload.single('audioFile'), audioController.uploadAudio, audioController.transcribeAudio, (req, res) => {
  res.status(200).json({ transcript: res.locals.transcript });
});

module.exports = router;
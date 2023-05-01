const express = require("express");
const router = express.Router();

const dotenv = require('dotenv');
const { PutObjectCommand, S3Client } = require("@aws-sdk/client-s3");

const multer = require('multer');
const { memoryStorage } = require('multer');

const storage = memoryStorage();
const upload = multer({ storage });

// const Controller = require('../controllers/Controller');
const audioController = require('../controllers/audioController');

const checkAudio = (req, res, next) => {
  console.log('Checking request body for audioFile and key', req.body);
  return next();
}

router.post('/uploadAudio', upload.single('audioFile'), audioController.uploadAudio, audioController.transcribeAudio, audioController.chatGPT, (req, res) => {
  res.status(200).json({
    link: res.locals.link,
    transcript: res.locals.transcript,
    chatGPT: res.locals.chatGPT,
    // cGPTSpeech: res.locals.cGPTSpeech,
  });
});

module.exports = router;
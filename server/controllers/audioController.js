const dotenv = require('dotenv');
const { PutObjectCommand, S3Client } = require("@aws-sdk/client-s3");
const { TranscribeClient, StartTranscriptionJobCommand } = require("@aws-sdk/client-transcribe");

const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const region = process.env.S3_REGION;
const bucket = process.env.S3_BUCKET;

const clientParams = {
  region,
  credentials: { accessKeyId, secretAccessKey },
};

const client = new S3Client(clientParams);
const transcribeClient = new TranscribeClient(clientParams);

const audioController = {};

audioController.uploadAudio = async (req, res, next) => {
  console.log(req);
  try {
    const command = new PutObjectCommand({
      Key: req.body.key, //request body.key would have the name of the file
      Bucket: bucket,
      Body: req.file.buffer,
      ContentType: 'audio/mpeg',
      ACL: 'public-read'
    });
    /* v3 of aws sdk does not return the location (url) on return of the object upload as opposed to v2
    Although transcribe requires the URI and therefore the location url is not needed, I will leave it here for ref
    Reference: https://stackoverflow.com/questions/67984373/get-uploaded-object-url-with-javascript-aws-sdk-v3
    */
    const result = await client.send(command);
    // const link = `https://${bucket}.s3.${region}.amazonaws.com/${req.body.key}`
    const linkURI = `s3://${bucket}/${req.body.key}`;
    console.log(linkURI);
    res.locals.linkURI = linkURI;
    return next();
  } catch (err) {
    const errObj = {
      log: "audioController.uploadAudio had an error" + err,
      status: 400,
      message: { err: "An error occurred when uploading audio file" },
    };
    return next(errObj);
  }
}

audioController.transcribeAudio = async (req, res, next) => {
  //https://docs.aws.amazon.com/transcribe/latest/APIReference/API_StartTranscriptionJob.html
  const input = {
    TranscriptionJobName: `${req.body.key}Transcribe`,
    LanguageCode: "en-US",
    // IdentifyLanguage: true,
    Media: {
      MediaFileUri: res.locals.linkURI,
    },
  };

  try {
    const transcribeCommand = new StartTranscriptionJobCommand(input);
    const transcribeResponse = await transcribeClient.send(transcribeCommand);
    console.log("Transcription job created, the details:");
    console.log(transcribeResponse.TranscriptionJob);
    const transcribeJobName = transcribeResponse.TranscriptionJob.transcribeJobName;
    let isCompleteTranscribeResponse = transcribeResponse;

    /* checking if transcript job is completed every 5 seconds. Future implementation would be to utilize Amazon EventBridge and AWS Lambda for event handling
     https://docs.aws.amazon.com/transcribe/latest/dg/monitoring-events.html
     https://stackoverflow.com/questions/58451759/lambda-automatically-deletes-transcribe-job-upon-completion
    */
    do {
      console.log('Transcript current status is: ', isCompleteTranscribeResponse.TranscriptionJob.TranscriptionJobStatus);
      if (isCompleteTranscribeResponse.TranscriptionJob.TranscriptionJobStatus === 'FAILED') {
        const errObj = {
          log: "audioController.transcribeAudio transcription job failed",
          status: 400,
          message: { err: "An error occurred when transcribing the audio to speech" },
        };
        return next(errObj);
      } else {
        isCompleteTranscribeResponse = await transcribeClient.send(
          new GetTranscriptionJob({
          }));
      }

    } while (isCompleteTranscribeResponse.TranscriptionJob.TranscriptionJobStatus != 'COMPLETED');

    const transcriptURI = isCompleteTranscribeResponse.TranscriptionJob.Transcript.TranscriptFileUri;
    const transcript = await fetch(transcriptURI);
    console.log(transcript);
    res.locals.transcript = transcript;
    return next();
  } catch (err) {
    const errObj = {
      log: "audioController.transcribeAudio had an error" + err,
      status: 400,
      message: { err: "An error occurred when transcribing the file" },
    };
    return next(errObj);
  }
}


module.exports = audioController;
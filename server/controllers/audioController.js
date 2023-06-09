const dotenv = require('dotenv');
const { S3Client, PutObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3");
const { TranscribeClient, StartTranscriptionJobCommand, GetTranscriptionJobCommand } = require("@aws-sdk/client-transcribe");
const { PollyClient, StartSpeechSynthesisTaskCommand, GetSpeechSynthesisTaskCommand } = require("@aws-sdk/client-polly");
const { Configuration, OpenAIApi } = require("openai");


const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const region = process.env.S3_REGION;
const bucket = process.env.S3_BUCKET;
// const chatGPTAPIKEY = process.env.CHATGPT_API_KEY;
const openAIKey = process.env.OPENAI_KEY;

const clientParams = {
  region,
  credentials: { accessKeyId, secretAccessKey },
};

const client = new S3Client(clientParams);
const transcribeClient = new TranscribeClient(clientParams);
const pollyClient = new PollyClient(clientParams);

const configuration = new Configuration({
  apiKey: openAIKey,
});
const openai = new OpenAIApi(configuration);

const VoiceIdOptions = ['Emma', 'Brian', 'Ivy', 'Kendra', 'Kimberly', 'Salli', 'Joey', 'Justin'];

const audioController = {};

audioController.uploadAudio = async (req, res, next) => {
  console.log("Entering uploadAudio");
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
    const link = `https://${bucket}.s3.${region}.amazonaws.com/${req.body.key}`
    const linkURI = `s3://${bucket}/${req.body.key}`;
    res.locals.linkURI = linkURI;
    res.locals.link = link;
    console.log("Exiting uploadAudio: ", res.locals.link);
    return next();
  } catch (err) {
    const errObj = {
      log: "audioController.uploadAudio had an error " + err,
      status: 400,
      message: { err: "An error occurred when uploading audio file" },
    };
    return next(errObj);
  }

}

audioController.transcribeAudio = async (req, res, next) => {
  //https://docs.aws.amazon.com/transcribe/latest/APIReference/API_StartTranscriptionJob.html
  console.log("Entering transcribeAudio");
  const key = `${req.body.key}Transcribe`;
  const input = {
    TranscriptionJobName: key,
    LanguageCode: "en-US",
    // IdentifyLanguage: true,
    Media: {
      MediaFileUri: res.locals.linkURI,
    },
    OutputBucketName: bucket,
    OutputKey: `${req.body.key}Transcribe`,
  };

  try {
    const transcribeCommand = new StartTranscriptionJobCommand(input);
    const transcribeResponse = await transcribeClient.send(transcribeCommand);
    // console.log("Transcription job created, the details:");
    // console.log(transcribeResponse.TranscriptionJob);
    const TranscriptionJobName = transcribeResponse.TranscriptionJob.TranscriptionJobName;

    /* Problem: transcribe automatically sends a response after transcribeClient.send but it's TranscriptionJobStatus = IS_PENDING.
    You would have to wait (keep calling getTranscriptJob with the TranscriptJobName to see if status is COMPLETED) till the transcript is complete.
    Then the server would have to notify the client and send the transcript via Server-Sent-Events (https://stackoverflow.com/questions/34657222/how-to-use-server-sent-events-in-express-js).
     * Solution Attempt 1: Utilizing Amazon EventBridge to send an API call to notify our server when TranscriptionJobStatus is either COMPLETE OR FAILED,
      Once transcript job is completed or failed, it can send a request to a URL endpoint.
        --Unable to use this solution: EventBridge requires that the URL must be https which our localhost isn't and hard to make https
     * Solution Attempt 2: Making constant getTranscriptJob calls in a while loop until the TranscriptionJobStatus is COMPLETED or FAILED
        --It works but worries: I'm unsure how long transcribe takes to complete depending on audio length. This might send a superb amount of getTranscriptJob calls that AWS might return a LimitExceededException 
    */
    console.log('Waiting for transcribe to finish transcribing...');
    let isCompleteTranscribeResponse = transcribeResponse;
    do {
      if (isCompleteTranscribeResponse.TranscriptionJob.TranscriptionJobStatus === 'FAILED') {
        const errObj = {
          log: "audioController.transcribeAudio transcription job failed",
          status: 400,
          message: { err: "An error occurred when transcribing the audio to speech" },
        };
        return next(errObj);
      } else {
        isCompleteTranscribeResponse = await transcribeClient.send(
          new GetTranscriptionJobCommand({ TranscriptionJobName })
        );
      }

    } while (isCompleteTranscribeResponse.TranscriptionJob.TranscriptionJobStatus != 'COMPLETED');
    const transcriptURI = isCompleteTranscribeResponse.TranscriptionJob.Transcript.TranscriptFileUri;


    //GETTING THE TRANSCRIPT STRING FROM BUCKET
    const command = new GetObjectCommand({
      Bucket: bucket,
      Key: `${req.body.key}Transcribe`,
      ResponseContentType: "application/json",
    });

    //convert the body to string then parse as a JSON object for v3
    const response = await client.send(command);
    const transcriptResponse = await response.Body.transformToString();
    const finalResponse = JSON.parse(transcriptResponse);
    res.locals.transcript = finalResponse.results.transcripts[0].transcript;

    console.log("Exiting transcribeAudio: ", res.locals.transcript);
    return next();
  } catch (err) {
    const errObj = {
      log: "audioController.transcribeAudio had an error" + err,
      status: 400,
      message: { err: "An error occurred when sending transcribe request" },
    };
    return next(errObj);
  }

}

audioController.chatGPT = async (req, res, next) => {
  console.log("Entering chatGPT func");

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: res.locals.transcript }],
    });

    const completion_text = completion.data.choices[0].message.content;
    res.locals.chatGPT = completion_text;
    console.log("Exiting chatGPT func: " + res.locals.chatGPT);
    return next();
  } catch (err) {
    const errObj = {
      log: "audioController.chatGPT had an error" + err,
      status: 400,
      message: { err: "An error occurred when sending trancript to chatGPT" },
    };
    return next(errObj);
  }

}

audioController.pollyAudio = async (req, res, next) => {
  console.log("Entering pollyAudio");

  try {
    const voiceID = VoiceIdOptions[Math.round(Math.random() * VoiceIdOptions.length)];
    console.log('This is the voiceID', voiceID);
    const command = new StartSpeechSynthesisTaskCommand({
      Engine: 'standard',
      OutputFormat: 'mp3',
      OutputS3BucketName: bucket,
      Text: res.locals.chatGPT,
      VoiceId: voiceID,
    });

    const response = await pollyClient.send(command);
    console.log('This is the SpeechSynthesisResponse', response.SynthesisTask);

    const synthesisTaskName = response.SynthesisTask.TaskId;

    console.log('Waiting for polly to finish synthesizing...');
    let isCompleteSynthesisResponse = response;
    do {
      if (isCompleteSynthesisResponse.SynthesisTask.TaskStatus == 'failed') {
        const errObj = {
          log: "audioController.pollyAudio transcription job failed",
          status: 400,
          message: { err: "An error occurred when synthesizing the text to speech" },
        };
        return next(errObj);
      } else {
        isCompleteSynthesisResponse = await pollyClient.send(
          new GetSpeechSynthesisTaskCommand({ TaskId: synthesisTaskName })
        );
      }
    } while (isCompleteSynthesisResponse.SynthesisTask.TaskStatus != 'completed');
    const transcriptURI = isCompleteSynthesisResponse.SynthesisTask.OutputUri;

    res.locals.cGPTSpeech = transcriptURI;
    console.log("Exiting pollyAudio: ", transcriptURI);
    return next();
  } catch (err) {
    const errObj = {
      log: "audioController.pollyAudio had an error" + err,
      status: 400,
      message: { err: "An error occurred when sending sending chatGPT response to AWS Polly" + err },
    };
    return next(errObj);
  }

}

module.exports = audioController;
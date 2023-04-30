const dotenv = require('dotenv');
const { PutObjectCommand, S3Client } = require("@aws-sdk/client-s3");

const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const region = process.env.S3_REGION;
const bucket = process.env.S3_BUCKET;

const client = new S3Client({
  credentials: {
    accessKeyId,
    secretAccessKey
  },
  region,
});

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
    //Current solution: manually write out the url location via req variables send to command
    //Other solution: utilizing @aws-sdk/lib-storage Upload which will return location in metadata
    Reference: https://stackoverflow.com/questions/67984373/get-uploaded-object-url-with-javascript-aws-sdk-v3
    */
    const result = await client.send(command);
    const link = `https://${bucket}.s3.${region}.amazonaws.com/${req.body.key}`
    console.log(link);
    res.locals.link = link;
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


module.exports = audioController;
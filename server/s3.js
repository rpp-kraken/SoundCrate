// use docker secrets instead of .env for production environment variables
require('dotenv').config();
const { secrets } = require('docker-secret');
const AWS = require('aws-sdk');
const { uuid } = require('uuidv4');

// Connection to S3 bucket
const s3 = new AWS.S3({
<<<<<<< HEAD
    accessKeyId: secrets.ACCESS_KEY_ID || process.env.ACCESSKEYID,
    secretAccessKey: secrets.SECRET_ACCESS_KEY || process.env.SECRETACCESSKEY,
    region: secrets.REGION || process.env.REGION
=======
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    region: process.env.REGION
>>>>>>> dev
});

//Handles iPhone/Android recording files -- url returned is now publicly available
const uploadAudioFile = (audioFileData) => {
  const params = {
      Bucket: 'soundcrate',
      Key: `${uuid()}.m4a`,
      Body: audioFileData,
      ContentType: 'audio/mp4',
      ACL: 'public-read'
  };

  return s3.upload(params).promise()
      .then((data) => {
          return data.Location;
      })
      .catch((error) => {
          console.error(error);
          throw new Error('Failed to upload audio file to S3');
      });
};

//Handles jpeg images
const uploadImageFile = (imageFileData) => {
    const params = {
        Bucket: 'soundcrate',
        Key: `${uuid()}.jpeg`,
        Body: imageFileData,
        ContentType: 'image/jpeg',
        ACL: 'public-read'
    };

    return s3.upload(params).promise()
        .then((data) => {
            return data.Location;
        })
        .catch((error) => {
            console.error(error);
            throw new Error('Failed to upload image file to S3');
        });
  };


module.exports = {
    uploadAudioFile,
    uploadImageFile,
    s3
};
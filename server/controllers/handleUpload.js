const AWS = require('aws-sdk');
const { uploadAudioFile, uploadImageFile, s3 } = require('../s3');
const models = require('../models/index');


const handleUpload = async (req, res) => {
  console.log('here is req.body',req.body)
  console.log('REQ FILES', req.body.audioFile)
  // const data = req.body;
  // const tags = req.body.tags;
  // const audioFileData = req.body.audioFile;
  // const imageFileData = req.body.imageFile;



  // const audioFileData = song;
  // const imageFileData = image;

  const data = req.body;
  const { tags } = req.body;

  const audioFileData = req.files['audioFile'][0].buffer;
  const imageFileData = req.files['imageFile'][0].buffer;
  console.log("HIT: ", typeof audioFileData, imageFileData);

  const songsTable = process.env.NODE_ENV === 'test' ? 'temp_songs' : 'songs';
  const tagsTable = process.env.NODE_ENV === 'test' ? 'temp_tags' : 'song_tags';
  const usersTable = process.env.NODE_ENV === 'test' ? 'temp_users' : 'users';
  try {
    await uploadAudioFile(audioFileData)
      .then(audioFileUrl => {
        data.path_to_song = audioFileUrl;
        return uploadImageFile(imageFileData);
      })
      .then(imageFileUrl => {
        data.path_to_artwork = imageFileUrl;
      });
      await models.addSong(data, songsTable, usersTable);
      await models.addTags(tags, req.body.title, songsTable, tagsTable);
      res.status(201).json('successfully uploaded song');
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to upload audio file' });
  }
};

module.exports = {
  handleUpload
};
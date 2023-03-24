const AWS = require('aws-sdk');
const { uploadAudioFile, uploadImageFile, s3 } = require('../s3');
const models = require('../models/index');

const handleUpload = async (req, res) => {
  if (!req.files['audioFile']) {
    res.sendStatus(500);
    return;
  }
  const data = req.body;
  const audioFileData = req.files['audioFile'][0].buffer;
  const imageFileData = req.files['imageFile'][0].buffer;

  try {
    data.path_to_song = await uploadAudioFile(audioFileData);
    data.path_to_artwork = await uploadImageFile(imageFileData);
    await models.addSong(data);
    await models.addTags(data.tags, req.body.title);
    res.status(201).json('successfully uploaded song');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to upload audio file' });
  }
};

module.exports = {
  handleUpload
};
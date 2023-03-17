const AWS = require('aws-sdk');
const { uploadAudioFile, uploadImageFile, s3 } = require('../s3');
const models = require('../models/index');

const handleUpload = (req, res) => {
  const data = req.body;
  const { tags } = req.body;
  const audioFileData = req.files['audioFile'][0].buffer;
  const imageFileData = req.files['imageFile'][0].buffer;
  let audioUrl;
  let imageUrl;
  uploadAudioFile(audioFileData)
    .then(audioFileUrl => {
      data.path_to_song = audioFileUrl;
      audioUrl = audioFileUrl;
      return uploadImageFile(imageFileData);
    })
    .then(imageFileUrl => {
      data.path_to_artwork = imageFileUrl;
      imageUrl = imageFileUrl;
      models.addSong(data);
      models.addTags(tags, req.body.title);
      res.json({ audioUrl, imageUrl });
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ error: 'Failed to upload audio file' });
    });
};

module.exports = {
  handleUpload
};
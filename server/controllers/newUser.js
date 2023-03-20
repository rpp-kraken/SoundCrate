const AWS = require('aws-sdk');
const { uploadAudioFile, uploadImageFile, s3 } = require('../s3');
const models = require('../models/index');

const newUser = async (req, res) => {
  const data = req.body;
  // const imageFileData = req.files['imageFile'][0].buffer;
  const usersTable = process.env.NODE_ENV === 'test' ? 'temp_users' : 'users';

  try {
    // await uploadImageFile(imageFileData)
    //   .then(imageFileUrl => {
    //     data.path_to_artwork = imageFileUrl;
    //   });

    console.log(data)
    await models.addUser(data, usersTable);
    res.status(201).json('successfully added new user');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add new user' });
  }
};

module.exports = {
  newUser
}
const AWS = require('aws-sdk');
const { uploadAudioFile, uploadImageFile, s3 } = require('../s3');
const models = require('../models/index');

const newUser = async (req, res) => {
  const data = req.body;
  const usersTable = process.env.NODE_ENV === 'test' ? 'temp_users' : 'users';
  console.log(data);

  try {
    if (req.body.imageFile !== '') {
      const imageFileData = req.files['imageFile'][0].buffer || '';
      await uploadImageFile(imageFileData)
        .then(imageFileUrl => {
          console.log('image file url', imageFileUrl)
          data.path_to_pic = imageFileUrl;
        });
    }

    // await models.addUser(data, usersTable);
    // console.log('data', data)

    await models.addUser(data);
    res.status(201).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add new user' });
  }
};

module.exports = {
  newUser
}
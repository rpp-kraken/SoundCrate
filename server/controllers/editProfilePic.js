const AWS = require('aws-sdk');
const { uploadImageFile, s3 } = require('../s3');
const models = require('../models/index');

module.exports = {
  editProfilePic: async (req, res) => {
    if (!req.file.buffer) {
      return res.status(500).json({ message: 'Image file not accepted' });
    }
    const userId = req.query.userId;
    const imageFileData = req.file.buffer;

    try {
      const user = await models.checkUser(userId);
      if (!Object.keys(user).length) {
        return res.status(404).json({ message: 'User not found' });
      }
      const pathToPic = await uploadImageFile(imageFileData);
      await models.editProfilePic(pathToPic, userId);
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update image file' });
    }
  }
};

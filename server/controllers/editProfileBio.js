const models = require('../models/index');

module.exports = {
  editProfileBio: async (req, res) => {
    const userId = req.query.userId;
    const { bio } = req.body;

    try {
      const user = await models.checkUser(userId);
      if (!Object.keys(user).length) {
        return res.status(404).json({ message: 'User not found' });
      }

      await models.editBio(userId, bio);
      res.sendStatus(204);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to edit bio' });
    }
  }
};
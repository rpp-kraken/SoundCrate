const models = require('../models/index');

module.exports = {
  getFavoriteSongs: async (req, res) => {
    const user = req.query.user;

    try {
      const userId = await models.getUserId(user);
      if (!Object.keys(userId).length) {
        return res.status(404).json({ message: 'User not found' });
      }
      models.getUsersFavoriteSongs(userId)
        .then(songs => {
          res.json(songs.rows);
        });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to get favorite songs' });
    }
  }
};
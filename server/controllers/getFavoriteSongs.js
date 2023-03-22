const models = require('../models/index');

module.exports = {
  getFavoriteSongs: async (req, res) => {
    const user = req.query.user;

    try {
      models.getUsersFavoriteSongs(user)
        .then(songs => {
          res.json(songs.rows);
        });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to get favorite songs' });
    }
  }
};
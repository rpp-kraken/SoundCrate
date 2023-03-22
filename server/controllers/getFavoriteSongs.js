const models = require('../models/index');

module.exports = {
  getFavoriteSongs: (req, res) => {
    const user = req.query.user;
    models.getUsersFavoriteSongs(user)
      .then(songs => {
        res.json(songs);
      })
      .catch(err => {
        res.status(500).json({ error: 'Failed to get favorite songs' });
      });
  }
};
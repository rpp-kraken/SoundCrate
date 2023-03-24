const models = require('../models/index');

module.exports = {
  getSongs: (req, res) => {
    const user = req.query.user.replace('%20', ' ');
    models.getAllSongs(user)
      .then(songs => {
        res.json(songs);
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({ error: 'Failed to get songs'});
      });
  }
};

const models = require('../models/index');

module.exports = {
  getSongsByUser: (req, res) => {
    const user = req.query.user.replace('%20', ' ');
    models.getSongsByUser(user)
      .then(songs => {
        res.json(songs);
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({ error: 'Failed to get songs'});
      });
  }
};

const models = require('../models/index');

module.exports = {
  getAllSongsHome: (req, res) => {
    models.getAllSongsHome()
      .then(songs => {
        res.json(songs);
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({ error: 'Failed to get songs'});
      });
  }
};

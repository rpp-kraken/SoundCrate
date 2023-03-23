const models = require('../models/index');

module.exports = {
  getOneSong: (req, res) => {
    console.log("🚀 ~ file: getSongs.js:17 ~ req:", req.query);
    const songId = req.query.songId;
    models.getSong(songId)
      .then(song => {
        res.json(song);
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({ error: 'Failed to get songs'});
      });
  }
};

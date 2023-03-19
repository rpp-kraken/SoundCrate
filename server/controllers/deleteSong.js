const models - require('../models/index');

module.exports = {
  handleDelete: (req, res) => {
    const songId = req.query.songId;
    models.deleteSong(songId)
      .then(success => {
        res.sendStatus(204);
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({ error: 'Failed to delete song'})
      });
  }
};
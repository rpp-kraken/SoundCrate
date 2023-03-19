const models = require('../models/index');

module.exports = {
  handleDelete: (req, res) => {
    const songsTable = process.env.NODE_ENV === 'test' ? 'temp_songs' : 'songs';
    const tagsTable = process.env.NODE_ENV === 'test' ? 'temp_tags' : 'song_tags';
    const songId = req.query.songId;
    models.deleteSong(songId, songsTable, tagsTable)
      .then(success => {
        res.sendStatus(204);
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({ error: 'Failed to delete song'})
      });
  }
};
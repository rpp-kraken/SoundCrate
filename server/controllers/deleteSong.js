const models = require('../models/index');

module.exports = {
  handleDelete: async (req, res) => {
    const songsTable = process.env.NODE_ENV === 'test' ? 'temp_songs' : 'songs';
    const tagsTable = process.env.NODE_ENV === 'test' ? 'temp_tags' : 'song_tags';
    const songId = req.query.songId;

    try {
      const { rowCount } = await models.getSong(songId, songsTable);
      if (rowCount === 0) {
        return res.status(404).json({ message: 'Song not found' });
      }

      await models.deleteSong(songId, songsTable, tagsTable);
      res.sendStatus(204);

    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to delete song' });
    }
  }
};
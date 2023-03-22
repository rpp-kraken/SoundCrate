const models = require('../models/index');

module.exports = {
  handleDelete: async (req, res) => {
    const songId = req.query.songId;

    try {
      const { rowCount } = await models.getSong(songId);
      if (rowCount === 0) {
        return res.status(404).json({ message: 'Song not found' });
      }

      await models.deleteSong(songId);
      res.sendStatus(204);

    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to delete song' });
    }
  }
};
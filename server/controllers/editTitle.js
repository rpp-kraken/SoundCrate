const models = require('../models/index');

const editTitle = (req, res) => {
  const songId = req.query.songId;
  const { title } = req.body;
  try {
    const { rowCount } = await models.getSong(songId);
    if (rowCount === 0) {
      return res.status(404).json({ message: 'Song not found '});
    }
    await models.editTitle(songId, title);
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update title' });
  }
};

module.exports = {
  editTitle
};
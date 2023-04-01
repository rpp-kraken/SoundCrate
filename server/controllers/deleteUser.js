const models = require('../models/index');

module.exports = {
  handleDeleteUser: async (req, res) => {
    const userId = req.query.userId;

    try {
      // delete all tags associated with that user
      await models.deleteTagsByUser(userId);

      // delete all songs associated with that user
      const songs = await models.getSongsByUserId(userId);
      if (songs) {
        songs.forEach(async (song) => await models.deleteSong(song.id));
      }

      // delete the user
      await models.deleteUser(userId);
      res.sendStatus(204);
    } catch (err) {
      console.error(err);
      res.sendStatus(500).json({ message: `Failed to delete user` });
    }
  }
}
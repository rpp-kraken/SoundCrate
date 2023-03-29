const models = require('../models/index');

module.exports = {
  addLikedSong: (req, res) => {
      let song = req.body.songName
      let songId = req.body.songId
      let user = req.body.userId
      models.addFavoriteSong(user, songId)
      models.incrementFavCount(songId)
  }
};
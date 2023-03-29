const models = require('../models/index');

module.exports = {
  dislikeSong: (req, res) => {
      let song = req.body.songName
      let songId = req.body.songId
      let user = req.body.userId
      models.decrementFavCount(songId)
      models.removeFavoriteSong(user, songId)
  }
};
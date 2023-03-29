const models = require('../models/index');

module.exports = {
  artistBadge: (req, res) => {
    const username = req.query.username;
    models.getUserByCol('username', username)
      .then(user => {
        res.json(user);
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({ error: 'Failed to get user'});
      });
  }
};
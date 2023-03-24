const models = require('../models/index');

module.exports = {
  artistBadge: (req, res) => {
    const id = req.query.username;
    models.getUserByid(id)
      .then(user => {
        res.json(user);
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({ error: 'Failed to get user'});
      });
  }
};
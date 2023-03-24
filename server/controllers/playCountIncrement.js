const models = require('../models/index');

module.exports = {
  playCountIncrement: (req, res) => {
    models.playCountIncrementModel(req.body.id)
      .then(results => {
        res.json(results);
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({ error: 'Failed to PUT: Play Count Increment Failed.'});
      });
  }
};

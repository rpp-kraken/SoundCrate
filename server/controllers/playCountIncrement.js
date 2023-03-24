const models = require('../models/index');

module.exports = {
  playCountIncrement: (req, res) => {

    console.log("🚀 ~ file: playCountIncrement.js:18 ~ req:", req.body.id);
    // const userEmail = req.query.userEmail;

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

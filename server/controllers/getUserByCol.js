const models = require('../models/index');

module.exports = {
  getUserByCol: (req, res) => {
    const col = req.query.col;
    const val = req.query.val;
    models.getUserByCol(col, val)
      .then(user => {
        res.json(user);
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({ error: 'Failed to get user'});
      });
  }
};

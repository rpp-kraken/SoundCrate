const models = require('../models/index');

module.exports = {
  getUser: (req, res) => {
    const userEmail = req.query.userEmail;
    models.getUser(userEmail)
      .then(user => {
        res.json(user);
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({ error: 'Failed to get user'});
      });
  }
};

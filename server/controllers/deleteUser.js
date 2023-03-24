const models = require('../models/index');

module.exports = {
  handleDeleteUser: async (req, res) => {
    const userId = req.query.userId;

    try {
      await models.deleteUser(userId);
      res.sendStatus(204);
    } catch (err) {
      console.error(err);
      res.sendStatus(500).json({ message: `Failed to delete user` });
    }
  }
}
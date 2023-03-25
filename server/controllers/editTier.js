const models = require('../models/index');

const editTier = async (req, res) => {
  const userId = req.query.userId;
  const body = req.body;
  try {
    await models.editTier(userId, body.newTier, body.oldTier);
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update tier' });
  }
};

module.exports = {
  editTier
};

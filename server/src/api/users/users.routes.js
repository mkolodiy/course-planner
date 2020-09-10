const express = require('express');
const User = require('../users/users.model');
const { getAllowedUserFields } = require('../../common/utils');
const { userNotExisting } = require('../../common/messages');

const router = express.Router();

router.get('/profile', async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email }).exec();
    if (!user) {
      res.status(403);
      throw new Error(userNotExisting);
    }

    res.json({
      user: getAllowedUserFields(user)
    });
  } catch (err) {
    next(err);
  }
});

router.post('/profile', (req, res, next) => {});

module.exports = router;

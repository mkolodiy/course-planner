const express = require('express');
const User = require('../users/users.model');
const { userNotExisting } = require('../../common/messages');

const router = express.Router();

router.get('/profile', async (req, res, next) => {
  const { id } = req.user;
  try {
    const user = await User.findById(id).exec();
    if (!user) {
      res.status(403);
      throw new Error(userNotExisting);
    }

    res.json({
      user: user.getProperties()
    });
  } catch (err) {
    next(err);
  }
});

router.post('/profile', async (req, res, next) => {
  const { id } = req.user;
  const { firstName, lastName, email, password } = req.body;
  try {
    const user = await User.findById(id).exec();
    if (!user) {
      res.status(403);
      throw new Error(userNotExisting);
    }

    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.password = password;
    const updatedUser = await user.save();

    res.json({
      user: user.getProperties()
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;

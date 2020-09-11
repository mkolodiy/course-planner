const express = require('express');
const User = require('../users/users.model');
const jwt = require('../../common/jwt');
const {
  emailInUse,
  userNotExisting,
  invalidLogin
} = require('../../common/messages');
const {
  getAllowedUserFields,
  getUserFieldForToken
} = require('../../common/utils');

const router = express.Router();

router.post('/signup', async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    const userExists = await User.exists({ email });

    if (userExists) {
      res.status(403);
      throw new Error(emailInUse);
    }

    const user = await User.create({
      firstName,
      lastName,
      email,
      password
    });

    const token = await jwt.sign(getUserFieldForToken(user));

    res.json({
      user: getAllowedUserFields(user),
      token
    });
  } catch (err) {
    next(err);
  }
});

router.post('/signin', async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).exec();
    if (!user) {
      res.status(403);
      throw new Error(userNotExisting);
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      res.status(403);
      throw new Error(invalidLogin);
    }

    const token = await jwt.sign(getUserFieldForToken(user));

    res.json({
      user: getAllowedUserFields(user),
      token
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;

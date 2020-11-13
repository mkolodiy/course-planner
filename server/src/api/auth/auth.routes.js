const express = require('express');
const User = require('../users/users.model');
const jwt = require('../../common/jwt');
const {
  ValidationError,
  EMAIL_INVALID,
  EMAIL_IN_USE,
  PASSWORD_INVALID
} = require('../../common/errors');

const router = express.Router();

router.post('/signup', async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    const userExists = await User.exists({ email });

    if (userExists) {
      res.status(403);
      throw new ValidationError(EMAIL_IN_USE);
    }

    const user = await User.create({
      firstName,
      lastName,
      email,
      password
    });
    const userObject = user.toObject({
      versionKey: false
    });
    const { _id, roles } = userObject;

    const token = await jwt.sign({ _id, roles });

    res.json({
      user: userObject,
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
      throw new ValidationError(EMAIL_INVALID);
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      res.status(403);
      throw new ValidationError(PASSWORD_INVALID);
    }

    const userObject = user.toObject({
      versionKey: false
    });
    const { _id, roles } = userObject;

    const token = await jwt.sign({ _id, roles });

    res.json({
      user: userObject,
      token
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;

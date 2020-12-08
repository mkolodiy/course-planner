const express = require('express');
const User = require('../users/users.model');
const {
  CustomError,
  USER_NOT_FOUND,
  EMAIL_IN_USE
} = require('../../common/errors');

const router = express.Router();

router.get('/profile', async (req, res, next) => {
  const { _id } = req.user;
  try {
    const user = await User.findById(_id).exec();
    if (!user) {
      res.status(403);
      throw new CustomError(USER_NOT_FOUND);
    }

    res.json({
      user: user.toObject({
        versionKey: false
      })
    });
  } catch (err) {
    next(err);
  }
});

router.post('/profile', async (req, res, next) => {
  const { _id } = req.user;
  const {
    firstName: newFirstName,
    lastName: newLastName,
    email: newEmail,
    password: newPassword
  } = req.body;
  try {
    const user = await User.findById(_id).exec();
    const { firstName, lastName, email } = user;

    if (!user) {
      res.status(403);
      throw new CustomError(USER_NOT_FOUND);
    }

    if (newFirstName && newFirstName !== '' && firstName !== newFirstName) {
      user.firstName = newFirstName;
    }

    if (newLastName && newLastName !== '' && lastName !== newLastName) {
      user.lastName = newLastName;
    }

    if (newEmail && newEmail !== '' && email !== newEmail) {
      const userExists = await User.exists({ email: newEmail });
      if (userExists) {
        res.status(403);
        throw new CustomError(EMAIL_IN_USE);
      }

      user.email = newEmail;
    }

    if (newPassword && newPassword !== '') {
      user.password = newPassword;
    }

    const updatedUser = await user.save();

    res.json({
      user: updatedUser.toObject({
        versionKey: false
      })
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;

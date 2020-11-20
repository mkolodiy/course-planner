const express = require('express');
const User = require('../users/users.model');
const { CustomError, USER_NOT_FOUND } = require('../../common/errors');

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
  const { firstName, lastName, email, password } = req.body;
  try {
    const user = await User.findById(_id).exec();
    if (!user) {
      res.status(403);
      throw new CustomError(USER_NOT_FOUND);
    }

    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.password = password;
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

const express = require('express');
const User = require('../users/users.model');
const { emailInUse } = require('../../common/messages');

const router = express.Router();

router.post('/signup', async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    const userExists = await User.exists({ email });

    if (userExists) {
      res.status(403);
      throw new Error(emailInUse);
    }

    const insertedUser = await User.create({
      firstName,
      lastName,
      email,
      password
    });

    const allowedUserFileds = {
      firstName: insertedUser.firstName,
      lastName: insertedUser.lastName,
      email: insertedUser.email
    };

    res.json({
      user: allowedUserFileds
    });
  } catch (err) {
    next(err);
  }
});

router.post('/signin', () => {});

module.exports = router;

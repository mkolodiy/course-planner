const express = require('express');
const { authenticateToken } = require('../middlewares');
const { defaultMessage } = require('../common/messages');

const auth = require('./auth/auth.routes');
const users = require('./users/users.routes');
const courseTypes = require('./course-types/courseTypes.routes');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: defaultMessage
  });
});

router.use('/auth', auth);

router.use(authenticateToken);

router.use('/users', users);
router.use('/coursetypes', courseTypes);

module.exports = router;

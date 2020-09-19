const express = require('express');
const { authenticateToken, hasAdminAccess } = require('../middlewares');
const { defaultMessage } = require('../common/messages');

const auth = require('./auth/auth.routes');
const users = require('./users/users.routes');
const courseTypes = require('./course-types/courseTypes.routes');
const courses = require('./courses/cources.routes');
const worklogs = require('./worklogs/worklogs.routes');
const participants = require('./participants/participants.routes');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: defaultMessage
  });
});

router.use('/auth', auth);

router.use(authenticateToken);
router.use('/users', users);
router.use('/courses', courses);
router.use('/worklogs', worklogs);
router.use('/participants', participants);

router.use(hasAdminAccess);
router.use('/coursetypes', courseTypes);

module.exports = router;

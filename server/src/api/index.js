const express = require('express');
const { defaultMessage } = require('../common/messages');

const auth = require('./auth/auth.routes');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: defaultMessage
  });
});

router.use('/auth', auth);

module.exports = router;

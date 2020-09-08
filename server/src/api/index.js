const express = require('express');
const { defaultMessage } = require('../common/messages');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: defaultMessage
  });
});

module.exports = router;

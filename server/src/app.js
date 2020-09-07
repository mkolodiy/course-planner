const express = require('express');
const messages = require('./common/messages');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: messages.defaultMessage
  });
});

module.exports = app;

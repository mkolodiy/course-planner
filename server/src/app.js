const express = require('express');
const messages = require('./common/messages');
const { notFound, errorHandler } = require('./middlewares');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: messages.defaultMessage
  });
});

app.use(notFound);
app.use(errorHandler);

module.exports = app;

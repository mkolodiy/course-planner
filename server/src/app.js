const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const { defaultMessage } = require('./common/messages');
const { notFound, errorHandler } = require('./middlewares');

const api = require('./api');

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));

app.get('/', (req, res) => {
  res.json({
    message: defaultMessage
  });
});

app.use('/api/v1', api);

app.use(notFound);
app.use(errorHandler);

module.exports = app;

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { defaultMessage } = require('./common/messages');
const { notFound, errorHandler } = require('./middlewares');

const app = express();
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('MongoDB connection successful.'))
  .catch((error) =>
    console.log(
      `MongoDB connection error. Please make sure MongoDB is running. ${error}`
    )
  );

app.get('/', (req, res) => {
  res.json({
    message: defaultMessage
  });
});

app.use(notFound);
app.use(errorHandler);

module.exports = app;

require('dotenv').config();
const mongoose = require('mongoose');

const environment = process.env.NODE_ENV || 'development';
const uri =
  environment === 'development'
    ? `${process.env.MONGO_DB_URI}${process.env.MONGO_DB}`
    : `${process.env.MONGO_DB_URI}${process.env.MONGO_DB_TEST}`;

const createConnection = () =>
  mongoose
    .connect(uri, {
      auth: {
        authSource: 'admin'
      },
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      user: process.env.MONGO_DB_USER,
      pass: process.env.MONGO_DB_PASSWORD
    })
    .then(() => {
      if (environment === 'development') {
        console.log('MongoDB connection successful.');
      }
    })
    .catch(err =>
      console.log(
        `MongoDB connection error. Please make sure MongoDB is running. ${err}`
      )
    );

module.exports = { createConnection };

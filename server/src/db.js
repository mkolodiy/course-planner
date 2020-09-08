require('dotenv').config();
const mongoose = require('mongoose');

const environment = process.env.NODE_ENV || 'development';
const uri =
  environment === 'development'
    ? `${process.env.MONGODB_URI}${process.env.MONGO_DB}`
    : `${process.env.MONGODB_URI}${process.env.MONGO_DB_TEST}`;

const createConnection = () =>
  mongoose
    .connect(uri, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
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

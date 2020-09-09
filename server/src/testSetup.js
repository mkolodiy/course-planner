const mongoose = require('mongoose');
const { createConnection } = require('./db');

beforeAll(async () => {
  await createConnection();
});

afterAll(async () => {
  await mongoose.disconnect();
});

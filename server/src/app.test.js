const supertest = require('supertest');
const app = require('./app');
const messages = require('./common/messages');

describe('GET /', () => {
  it('should respond with a default message', async () => {
    const response = await supertest(app)
      .get('/')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body.message).toEqual(messages.defaultMessage);
  });
});

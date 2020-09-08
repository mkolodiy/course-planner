const supertest = require('supertest');
const app = require('./app');
const { defaultMessage, createNotFoundMessage } = require('./common/messages');

describe('GET /', () => {
  it('should respond with default message', async () => {
    const response = await supertest(app)
      .get('/')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body.message).toEqual(defaultMessage);
  });

  it('should respond with not found message', async () => {
    const url = '/test';
    const response = await supertest(app)
      .get(url)
      .expect('Content-Type', /json/)
      .expect(404);

    expect(response.body.message).toEqual(createNotFoundMessage(url));
  });
});

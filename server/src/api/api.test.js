const supertest = require('supertest');
const app = require('../app');
const { defaultMessage } = require('../common/messages');

describe('GET /api/v1', () => {
  it('should respond with default message', async () => {
    const response = await supertest(app)
      .get('/')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body.message).toEqual(defaultMessage);
  });
});

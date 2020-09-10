const supertest = require('supertest');
const app = require('../../app');
const User = require('./users.model');
const { userNotExisting } = require('../../common/messages');

const testUser = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@doe.com',
  password: 'test1234'
};

describe('POST /api/v1/users/profile', () => {
  beforeEach(async () => {
    await supertest(app)
      .post('/api/v1/auth/signup')
      .send(testUser)
      .expect('Content-Type', /json/)
      .expect(200);
  });

  afterEach(async () => {
    await User.deleteMany();
  });

  it('should return user information', async () => {
    const response = await supertest(app)
      .get('/api/v1/users/profile')
      .send({
        email: testUser.email
      })
      .expect('Content-Type', /json/)
      .expect(200);

    const user = response.body.user;
    expect(user.firstName).toEqual(testUser.firstName);
    expect(user.lastName).toEqual(testUser.lastName);
    expect(user.email).toEqual(testUser.email);
    expect(user.password).not.toBeDefined();
  });

  it('should return 403 when user does not exist', async () => {
    const response = await supertest(app)
      .get('/api/v1/users/profile')
      .send({
        email: 'test@test.com'
      })
      .expect('Content-Type', /json/)
      .expect(403);

    const message = response.body.message;
    expect(message).toEqual(userNotExisting);
  });
});

const supertest = require('supertest');
const app = require('../../app');
const User = require('../users/users.model');
const {
  PASSWORD_INVALID,
  EMAIL_INVALID,
  EMAIL_IN_USE
} = require('../../common/errors');

const testUser = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@doe.com',
  password: 'test1234'
};

const testError = (err, expectedResult) => {
  const {
    cause: {
      name,
      error: { message }
    }
  } = err;
  expect(name).toEqual(expectedResult.name);
  expect(message).toEqual(expectedResult.error.message);
};

describe('POST /api/v1/auth/signup', () => {
  afterEach(async () => {
    await User.deleteMany();
  });

  it('should create a new user', async () => {
    const response = await supertest(app)
      .post('/api/v1/auth/signup')
      .send(testUser)
      .expect('Content-Type', /json/)
      .expect(200);

    const user = response.body.user;
    expect(user.firstName).toEqual(testUser.firstName);
    expect(user.lastName).toEqual(testUser.lastName);
    expect(user.email).toEqual(testUser.email);
    expect(user.password).not.toBeDefined();

    const token = response.body.token;
    expect(token).toBeDefined();
  });

  it('should return 403 status when user already exists', async () => {
    await supertest(app).post('/api/v1/auth/signup').send(testUser);

    const response = await supertest(app)
      .post('/api/v1/auth/signup')
      .send(testUser)
      .expect('Content-Type', /json/)
      .expect(403);

    testError(response.body, EMAIL_IN_USE);
  });
});

describe('POST /api/v1/auth/signin', () => {
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

  it('should signin a user with given email and password', async () => {
    const response = await supertest(app)
      .post('/api/v1/auth/signin')
      .send({
        email: testUser.email,
        password: testUser.password
      })
      .expect('Content-Type', /json/)
      .expect(200);

    const user = response.body.user;
    expect(user.firstName).toEqual(testUser.firstName);
    expect(user.lastName).toEqual(testUser.lastName);
    expect(user.email).toEqual(testUser.email);
    expect(user.password).not.toBeDefined();

    const token = response.body.token;
    expect(token).toBeDefined();
  });

  it('should return 403 when user does not exist', async () => {
    const response = await supertest(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'test@test.com',
        password: testUser.password
      })
      .expect('Content-Type', /json/)
      .expect(403);

    testError(response.body, EMAIL_INVALID);
  });

  it('should return 403 when user provides wrong password', async () => {
    const response = await supertest(app)
      .post('/api/v1/auth/signin')
      .send({
        email: testUser.email,
        password: 'wrongpassword1234'
      })
      .expect('Content-Type', /json/)
      .expect(403);

    testError(response.body, PASSWORD_INVALID);
  });
});

const supertest = require('supertest');
const app = require('../../app');
const User = require('./users.model');
const { USER_NOT_FOUND, TOKEN_INVALID } = require('../../common/errors');

const testUser = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@doe.com',
  password: 'test1234'
};

const updatedTestUser = {
  firstName: 'James',
  lastName: 'Bright',
  email: 'james@bright.com',
  password: 'newtestpassword1234'
};

let token;

const testError = (err, expectedResult) => {
  const { cause } = err;
  expect(cause).toEqual(expectedResult);
};

describe('GET /api/v1/users/profile', () => {
  beforeEach(async () => {
    const response = await supertest(app)
      .post('/api/v1/auth/signup')
      .send(testUser);

    token = response.body.token;
  });

  afterEach(async () => {
    await User.deleteMany({});
  });

  it('should return user information', async () => {
    const response = await supertest(app)
      .get('/api/v1/users/profile')
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(200);

    const user = response.body.user;
    expect(user.firstName).toEqual(testUser.firstName);
    expect(user.lastName).toEqual(testUser.lastName);
    expect(user.email).toEqual(testUser.email);
    expect(user.password).not.toBeDefined();
  });

  it('should return 403 when token is invalid', async () => {
    const response = await supertest(app)
      .get('/api/v1/users/profile')
      .set('Authorization', 'Bearer xxx')
      .expect('Content-Type', /json/)
      .expect(403);

    testError(response.body, TOKEN_INVALID);
  });

  it('should return 403 when user does not exist', async () => {
    await User.deleteMany({});
    const response = await supertest(app)
      .get('/api/v1/users/profile')
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(403);

    testError(response.body, USER_NOT_FOUND);
  });
});

describe('POST /api/v1/users/profile', () => {
  beforeEach(async () => {
    const response = await supertest(app)
      .post('/api/v1/auth/signup')
      .send(testUser);

    token = response.body.token;
  });

  afterEach(async () => {
    await User.deleteMany({});
  });

  it('should return updated user information', async () => {
    const response = await supertest(app)
      .post('/api/v1/users/profile')
      .set('Authorization', `Bearer ${token}`)
      .send(updatedTestUser)
      .expect('Content-Type', /json/)
      .expect(200);

    const user = response.body.user;
    expect(user.firstName).toEqual(updatedTestUser.firstName);
    expect(user.lastName).toEqual(updatedTestUser.lastName);
    expect(user.email).toEqual(updatedTestUser.email);
    expect(user.password).not.toBeDefined();
  });

  it('should return 403 when token is invalid', async () => {
    const response = await supertest(app)
      .post('/api/v1/users/profile')
      .set('Authorization', 'Bearer xxx')
      .send(updatedTestUser)
      .expect('Content-Type', /json/)
      .expect(403);

    testError(response.body, TOKEN_INVALID);
  });

  // it('should return 403 when user does not exist', async () => {
  //   await User.deleteMany({ email: testUser.email });
  //   const response = await supertest(app)
  //     .post('/api/v1/users/profile')
  //     .set('Authorization', `Bearer ${token}`)
  //     .send(updatedTestUser)
  //     .expect('Content-Type', /json/)
  //     .expect(403);

  //   testError(response.body, USER_NOT_FOUND);
  // });
});

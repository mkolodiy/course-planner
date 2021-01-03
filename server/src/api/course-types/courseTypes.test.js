const supertest = require('supertest');
const app = require('../../app');
const User = require('../users/users.model');
const CourseType = require('./courseTypes.model');

const {
  COURSE_TYPE_IN_USE,
  ACCESS_NOT_ALLOWED,
  COURSE_TYPE_DELETED
} = require('../../common/errors');

const ROLES = User.getRoles();

const trainerTestUser = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@doe.com',
  password: 'test1234',
  roles: [ROLES.TRAINER]
};

const adminTestUser = {
  firstName: 'James',
  lastName: 'Bright',
  email: 'james@bright.com',
  password: 'test1234',
  roles: [ROLES.TRAINER, ROLES.ADMIN]
};

const testCourseType = {
  name: 'Intensive Course',
  courseDuration: 10,
  unitDuration: 4
};

let trainerToken;
let adminToken;

const testError = (err, expectedResult) => {
  const { cause } = err;
  expect(cause).toEqual(expectedResult);

  if (expectedResult.name && expectedResult.error) {
    expect(cause.name).toEqual(expectedResult.name);
    expect(cause.error.message).toEqual(expectedResult.error.message);
  }
};

beforeAll(async () => {
  await User.create(trainerTestUser);
  const trainerResponse = await supertest(app)
    .post('/api/v1/auth/signin')
    .send({
      email: trainerTestUser.email,
      password: trainerTestUser.password
    });
  trainerToken = trainerResponse.body.token;

  await User.create(adminTestUser);
  const adminResponse = await supertest(app).post('/api/v1/auth/signin').send({
    email: adminTestUser.email,
    password: adminTestUser.password
  });
  adminToken = adminResponse.body.token;
});

afterAll(async () => {
  await User.deleteMany({});
});

describe('POST /api/v1/coursetypes', () => {
  afterEach(async () => {
    await CourseType.deleteMany({});
  });

  it('should create a course type', async () => {
    const response = await supertest(app)
      .post('/api/v1/coursetypes')
      .set('Authorization', `Bearer ${adminToken}`)
      .send(testCourseType)
      .expect('Content-Type', /json/)
      .expect(200);

    const courseType = response.body.courseType;
    expect(courseType.name).toEqual(testCourseType.name);
    expect(courseType.courseDuration).toEqual(testCourseType.courseDuration);
    expect(courseType.unitDuration).toEqual(testCourseType.unitDuration);
  });

  it('should fail if a course type with a given name already exists', async () => {
    await CourseType.create(testCourseType);

    const response = await supertest(app)
      .post('/api/v1/coursetypes')
      .set('Authorization', `Bearer ${adminToken}`)
      .send(testCourseType)
      .expect('Content-Type', /json/)
      .expect(409);

    testError(response.body, COURSE_TYPE_IN_USE);
  });

  it('should fail if user is not an admin', async () => {
    const response = await supertest(app)
      .post('/api/v1/coursetypes')
      .set('Authorization', `Bearer ${trainerToken}`)
      .send(testCourseType)
      .expect('Content-Type', /json/)
      .expect(403);

    testError(response.body, ACCESS_NOT_ALLOWED);
  });
});

describe('GET /api/v1/coursetypes', () => {
  afterEach(async () => {
    await CourseType.deleteMany({});
  });

  it('should return all course types', async () => {
    await CourseType.create(testCourseType);
    await CourseType.create({
      ...testCourseType,
      name: 'Test course type'
    });
    const response = await supertest(app)
      .get('/api/v1/coursetypes')
      .set('Authorization', `Bearer ${adminToken}`)
      .expect('Content-Type', /json/)
      .expect(200);

    const courseTypes = response.body.courseTypes;
    expect(courseTypes.length).toEqual(2);
  });

  it('should fail if user is not an admin', async () => {
    const response = await supertest(app)
      .post('/api/v1/coursetypes')
      .set('Authorization', `Bearer ${trainerToken}`)
      .send(testCourseType)
      .expect('Content-Type', /json/)
      .expect(403);

    testError(response.body, ACCESS_NOT_ALLOWED);
  });
});

describe('POST /api/v1/coursetypes/:id', () => {
  const updatedCourseType = {
    name: 'New name',
    courseDuration: 20,
    unitDuration: 10
  };

  afterEach(async () => {
    await CourseType.deleteMany({});
  });

  it('should update course type and return updated course type', async () => {
    const { id } = await CourseType.create(testCourseType);

    const response = await supertest(app)
      .post(`/api/v1/coursetypes/${id}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send(updatedCourseType)
      .expect('Content-Type', /json/)
      .expect(200);

    const courseType = response.body.courseType;
    expect(courseType.name).toEqual(updatedCourseType.name);
    expect(courseType.courseDuration).toEqual(updatedCourseType.courseDuration);
    expect(courseType.unitDuration).toEqual(updatedCourseType.unitDuration);
  });

  it('should fail if course type with given name already exists', async () => {
    const { id } = await CourseType.create(testCourseType);

    const response = await supertest(app)
      .post(`/api/v1/coursetypes/${id}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        name: testCourseType.name
      })
      .expect('Content-Type', /json/)
      .expect(409);

    const message = response.body.message;
    testError(response.body, COURSE_TYPE_IN_USE);
  });

  it('should fail if user is not an admin', async () => {
    const response = await supertest(app)
      .post('/api/v1/coursetypes')
      .set('Authorization', `Bearer ${trainerToken}`)
      .send(updatedCourseType)
      .expect('Content-Type', /json/)
      .expect(403);

    testError(response.body, ACCESS_NOT_ALLOWED);
  });
});

describe('DELETE /api/v1/coursetypes/:id', () => {
  afterEach(async () => {
    await CourseType.deleteMany({});
  });

  it('should delete a course type', async () => {
    const { id } = await CourseType.create(testCourseType);
    await CourseType.create({
      ...testCourseType,
      name: 'Test course type'
    });

    const deleteResponse = await supertest(app)
      .delete(`/api/v1/coursetypes/${id}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .expect('Content-Type', /json/)
      .expect(200);

    const message = deleteResponse.body.message;
    expect(message).toEqual(COURSE_TYPE_DELETED);

    const getResponse = await supertest(app)
      .get('/api/v1/coursetypes')
      .set('Authorization', `Bearer ${adminToken}`)
      .expect('Content-Type', /json/)
      .expect(200);

    const courseTypes = getResponse.body.courseTypes;
    expect(courseTypes.length).toEqual(1);
  });

  it('should fail if user is not an admin', async () => {
    const response = await supertest(app)
      .post('/api/v1/coursetypes')
      .set('Authorization', `Bearer ${trainerToken}`)
      .send(testCourseType)
      .expect('Content-Type', /json/)
      .expect(403);

    testError(response.body, ACCESS_NOT_ALLOWED);
  });
});

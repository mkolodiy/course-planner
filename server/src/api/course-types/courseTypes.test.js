const supertest = require('supertest');
const app = require('../../app');
const User = require('../users/users.model');
const CourseType = require('./courseTypes.model');
const { accessNotAllowed } = require('../../common/messages');

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

  it('should fail if user is not an admin', async () => {
    const response = await supertest(app)
      .post('/api/v1/coursetypes')
      .set('Authorization', `Bearer ${trainerToken}`)
      .send(testCourseType)
      .expect('Content-Type', /json/)
      .expect(403);

    const message = response.body.message;
    expect(message).toEqual(accessNotAllowed);
  });
});

describe('POST /api/v1/coursetypes', () => {
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

    const message = response.body.message;
    expect(message).toEqual(accessNotAllowed);
  });
});

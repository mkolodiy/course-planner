const supertest = require('supertest');
const app = require('../../app');
const User = require('../users/users.model');
const CourseType = require('../course-types/courseTypes.model');
const Course = require('./courses.model');

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

const createTestCourse = courseTypeId => ({
  name: 'Test course',
  type: courseTypeId,
  startDate: new Date(),
  endDate: new Date()
});

let trainerToken;
let adminToken;
let courseType;

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

  courseType = await CourseType.create(testCourseType);
});

afterAll(async () => {
  await CourseType.deleteMany({});
  await User.deleteMany({});
});

describe('POST /api/v1/courses', () => {
  afterEach(async () => {
    await Course.deleteMany({});
  });

  it('should create a course', async () => {
    const testCourse = createTestCourse(courseType.getProperties().id);
    const response = await supertest(app)
      .post('/api/v1/courses')
      .set('Authorization', `Bearer ${adminToken}`)
      .send(testCourse)
      .expect('Content-Type', /json/)
      .expect(200);

    const course = response.body.course;
    expect(course.name).toEqual(testCourse.name);
    expect(course.type.name).toEqual(testCourseType.name);
    expect(new Date(course.startDate)).toEqual(testCourse.startDate);
    expect(new Date(course.endDate)).toEqual(testCourse.endDate);
  });
});

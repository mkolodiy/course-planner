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

const createTestCourse = (courseTypeId, userId) => ({
  name: 'Test course',
  type: courseTypeId,
  startDate: new Date(),
  endDate: new Date(),
  user: userId
});

let trainerToken;
let adminToken;
let courseType;
let user;

beforeAll(async () => {
  user = await User.create(trainerTestUser);
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
    const testCourse = createTestCourse(
      courseType.getProperties().id,
      user.getProperties().id
    );
    const response = await supertest(app)
      .post('/api/v1/courses')
      .set('Authorization', `Bearer ${trainerToken}`)
      .send(testCourse)
      .expect('Content-Type', /json/)
      .expect(200);

    const course = response.body.course;
    expect(course.name).toEqual(testCourse.name);
    expect(course.type.name).toEqual(testCourseType.name);
    expect(new Date(course.startDate)).toEqual(testCourse.startDate);
    expect(new Date(course.endDate)).toEqual(testCourse.endDate);
  });

  it('should failed if required properties are missing', async () => {
    const testCourse = createTestCourse(
      courseType.getProperties().id,
      user.getProperties().id
    );
    delete testCourse.type;
    const response = await supertest(app)
      .post('/api/v1/courses')
      .set('Authorization', `Bearer ${trainerToken}`)
      .send(testCourse)
      .expect('Content-Type', /json/)
      .expect(400);

    const message = response.body.message;
    expect(message).toBeTruthy();
  });
});

describe('GET /api/v1/courses', () => {
  afterEach(async () => {
    await Course.deleteMany({});
  });

  it('should get all courses for a given user', async () => {
    const testCourse1 = createTestCourse(
      courseType.getProperties().id,
      user.getProperties().id
    );
    const testCourse2 = createTestCourse(
      courseType.getProperties().id,
      user.getProperties().id
    );
    await Course.create(testCourse1);
    await Course.create(testCourse2);

    const response = await supertest(app)
      .get('/api/v1/courses')
      .set('Authorization', `Bearer ${trainerToken}`)
      .expect('Content-Type', /json/)
      .expect(200);

    const courses = response.body.courses;
    expect(courses.length).toBe(2);
    const firstCourse = courses[0];
    expect(firstCourse.name).toBe(testCourse1.name);
    const secondCourse = courses[0];
    expect(secondCourse.name).toBe(secondCourse.name);
  });
});

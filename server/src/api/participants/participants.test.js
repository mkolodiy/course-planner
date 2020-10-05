const supertest = require('supertest');
const app = require('../../app');
const User = require('../users/users.model');
const CourseType = require('../course-types/courseTypes.model');
const Course = require('../courses/courses.model');
const Participant = require('./participants.model');

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

const createParticipant = courseId => ({
  firstName: 'Test',
  lastName: 'Participant',
  course: courseId
});

let trainerToken;
let adminToken;
let courseType;
let user;
let course;

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

  course = await Course.create(
    createTestCourse(courseType.getProperties().id, user.getProperties().id)
  );
});

afterAll(async () => {
  await Course.deleteMany({});
  await CourseType.deleteMany({});
  await User.deleteMany({});
});

describe('POST /api/v1/participants', () => {
  afterEach(async () => {
    await Participant.deleteMany({});
  });

  it('should create a new participant', async () => {
    const { id: courseId } = await course.getProperties();
    const testParticipant = createParticipant(courseId);

    const response = await supertest(app)
      .post('/api/v1/participants')
      .set('Authorization', `Bearer ${trainerToken}`)
      .send(testParticipant)
      .expect('Content-Type', /json/)
      .expect(200);

    const participant = response.body.participant;
    expect(participant.firstName).toEqual(testParticipant.firstName);
    expect(participant.lastName).toEqual(testParticipant.lastName);
  });

  it('should return error if required fields are not provided', async () => {
    const { id: courseId } = await course.getProperties();
    const testParticipant = createParticipant(courseId);
    delete testParticipant.lastName;

    const response = await supertest(app)
      .post('/api/v1/participants')
      .set('Authorization', `Bearer ${trainerToken}`)
      .send(testParticipant)
      .expect('Content-Type', /json/)
      .expect(400);
  });
});

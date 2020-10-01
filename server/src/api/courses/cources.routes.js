const express = require('express');
const { courseDeleted } = require('../../common/messages');
const Course = require('./courses.model');

const router = express.Router();

router.post('/', async (req, res, next) => {
  const userId = req.user.id;
  const { name, type, startDate, endDate } = req.body;
  try {
    const course = await Course.create({
      name,
      type,
      startDate,
      endDate,
      user: userId
    });

    res.json({
      course: await course.getProperties()
    });
  } catch (err) {
    res.status(400);
    next(err);
  }
});

router.get('/', async (req, res, next) => {
  const userId = req.user.id;
  try {
    const courses = await Course.find({ user: userId });
    res.json({
      courses: await Course.getProperties(courses)
    });
  } catch (err) {
    next(err);
  }
});

router.post('/:id', async (req, res, next) => {
  const id = req.params.id;
  const { body: update } = req;
  try {
    const course = await Course.findByIdAndUpdate(id, update, {
      new: true
    }).exec();

    res.json({
      course: await course.getProperties()
    });
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  const id = req.params.id;
  try {
    const course = await Course.findById(id).exec();

    res.json({
      course: await course.getProperties()
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  const id = req.params.id;
  try {
    await Course.findByIdAndDelete(id).exec();

    res.json({
      message: courseDeleted
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;

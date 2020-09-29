const express = require('express');
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

router.post('/:id', async () => {});

router.get('/:id', async () => {});

router.delete('/:id', async () => {});

module.exports = router;

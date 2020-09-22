const express = require('express');
const Course = require('./courses.model');

const router = express.Router();

router.post('/', async (req, res, next) => {
  const { name, type, startDate, endDate } = req.body;
  try {
    const course = await Course.create({
      name,
      type,
      startDate,
      endDate
    });

    res.json({
      course: await course.getProperties()
    });
  } catch (err) {
    next(err);
  }
});

router.get('/', async () => {});

router.post('/:id', async () => {});

router.get('/:id', async () => {});

router.delete('/:id', async () => {});

module.exports = router;

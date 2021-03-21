const express = require('express');
const { COURSE_DELETED } = require('../../common/errors');
const Course = require('./courses.model');

const router = express.Router();

router.post('/', async (req, res, next) => {
  const userId = req.user._id;
  const { name, type, startDate, endDate } = req.body;
  try {
    const course = await Course.create({
      name,
      type,
      startDate,
      endDate,
      user: userId
    });

    await course.populate('type').execPopulate();
    res.json({
      course: course.toObject({
        versionKey: false
      })
    });
  } catch (err) {
    res.status(400);
    next(err);
  }
});

router.get('/', async (req, res, next) => {
  const userId = req.user._id;
  try {
    const courses = await Course.find({ user: userId });

    for (const course of courses) {
      await course.populate('type').execPopulate();
      await course.populate('participants').execPopulate();
      await course
        .populate({
          path: 'worklogs',
          populate: {
            path: 'worklogEntries',
            model: 'WorklogEntry',
            populate: {
              path: 'participant',
              model: 'Participant'
            }
          }
        })
        .execPopulate();
    }

    res.json({
      courses: courses.map(course =>
        course.toObject({
          versionKey: false
        })
      )
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
      course: course.toObject({
        versionKey: false
      })
    });
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  const id = req.params.id;
  try {
    const course = await Course.findById(id).exec();
    await course.populate('type').execPopulate();
    res.json({
      course: course.toObject({
        versionKey: false
      })
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
      message: COURSE_DELETED
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;

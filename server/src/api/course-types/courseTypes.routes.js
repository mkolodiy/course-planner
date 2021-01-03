const express = require('express');
const CourseType = require('./courseTypes.model');
const {
  CustomError,
  COURSE_TYPE_IN_USE,
  COURSE_TYPE_DELETED
} = require('../../common/errors');

const router = express.Router();

router.post('/', async (req, res, next) => {
  const { name, courseDuration, unitDuration } = req.body;
  try {
    const courseTypeExists = await CourseType.exists({ name });
    if (courseTypeExists) {
      res.status(409);
      throw new CustomError(COURSE_TYPE_IN_USE);
    }

    const courseType = await CourseType.create({
      name,
      courseDuration,
      unitDuration
    });

    res.json({
      courseType: courseType.toObject({
        versionKey: false
      })
    });
  } catch (err) {
    next(err);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const courseTypes = await CourseType.find({});
    res.json({
      courseTypes: courseTypes.map(courseType =>
        courseType.toObject({
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
  const {
    body: update,
    body: { name }
  } = req;
  try {
    const courseTypeExists = await CourseType.exists({ name });
    if (courseTypeExists) {
      res.status(409);
      throw new CustomError(COURSE_TYPE_IN_USE);
    }

    const courseType = await CourseType.findByIdAndUpdate(id, update, {
      new: true
    }).exec();

    res.json({
      courseType: courseType.toObject({
        versionKey: false
      })
    });
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  const id = req.params.id;
  try {
    await CourseType.findByIdAndDelete(id).exec();

    res.json({
      message: COURSE_TYPE_DELETED
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;

const express = require('express');
const CourseType = require('./courseTypes.model');
const {
  courseTypeAlreadyDefined,
  courseTypeDeleted
} = require('../../common/messages');

const router = express.Router();

router.post('/', async (req, res, next) => {
  const { name, courseDuration, unitDuration } = req.body;
  try {
    const courseTypeExists = await CourseType.exists({ name });
    if (courseTypeExists) {
      res.status(409);
      throw new Error(courseTypeAlreadyDefined);
    }

    const courseType = await CourseType.create({
      name,
      courseDuration,
      unitDuration
    });

    res.json({
      courseType: courseType.getProperties()
    });
  } catch (err) {
    next(err);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const courseTypes = await CourseType.find({});
    res.json({
      courseTypes: CourseType.getProperties(courseTypes)
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
      throw new Error(courseTypeAlreadyDefined);
    }

    const courseType = await CourseType.findByIdAndUpdate(id, update, {
      new: true
    }).exec();

    res.json({
      courseType: courseType.getProperties()
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
      message: courseTypeDeleted
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;

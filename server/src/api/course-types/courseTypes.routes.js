const express = require('express');
const CourseType = require('./courseTypes.model');
const { courseAlreadyDefined } = require('../../common/messages');

const router = express.Router();

router.post('/', async (req, res, next) => {
  const { name, courseDuration, unitDuration } = req.body;
  try {
    const courseTypeExists = await CourseType.exists({ name });
    if (courseTypeExists) {
      res.status(409);
      throw new Error(courseAlreadyDefined);
    }

    const courseType = await CourseType.create({
      name,
      courseDuration,
      unitDuration
    });

    res.json({
      courseType
    });
  } catch (err) {
    next(err);
  }
});
router.get('/', async (req, res, next) => {});
router.post('/:id', async (req, res, next) => {});
router.delete('/:id', async (req, res, next) => {});

module.exports = router;

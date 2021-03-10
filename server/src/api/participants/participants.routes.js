const express = require('express');
const { PARTICIPANT_DELETED } = require('../../common/errors');
const Participant = require('./participants.model');
const Course = require('../courses/courses.model');

const router = express.Router();

router.post('/course/:id', async (req, res, next) => {
  const courseId = req.params.id;
  const { firstName, lastName } = req.body;

  try {
    const participant = await Participant.create({
      firstName,
      lastName
    });

    const course = await Course.findOne({ _id: courseId }).exec();
    course.participants = [...course.participants, participant];
    await course.save();

    res.json({
      participant: participant.toObject({
        versionKey: false
      })
    });
  } catch (err) {
    res.status(400);
    next(err);
  }
});

router.post('/:id', async (req, res, next) => {
  const id = req.params.id;
  const { body: update } = req;
  try {
    const participant = await Participant.findByIdAndUpdate(id, update, {
      new: true
    }).exec();

    res.json({
      participant: participant.toObject({
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
    await Participant.findByIdAndDelete(id).exec();

    res.json({
      message: PARTICIPANT_DELETED
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;

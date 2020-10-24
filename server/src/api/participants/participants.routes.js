const express = require('express');
const { participantDeleted } = require('../../common/messages');
const Participant = require('./participants.model');

const router = express.Router();

router.post('/', async (req, res, next) => {
  const { firstName, lastName, courseId } = req.body;
  try {
    const participant = await Participant.create({
      firstName,
      lastName,
      course: courseId
    });

    res.json({
      participant: participant.getProperties()
    });
  } catch (err) {
    res.status(400);
    next(err);
  }
});

router.get('/course/:courseId', async (req, res, next) => {
  const courseId = req.params.courseId;
  try {
    const participants = await Participant.find({ course: courseId }).exec();

    res.json({
      participants: Participant.getProperties(participants)
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
      message: participantDeleted
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;

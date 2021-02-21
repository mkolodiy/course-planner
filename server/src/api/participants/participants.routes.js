const express = require('express');
const { participantDeleted } = require('../../common/messages');
const Participant = require('./participants.model');
const Course = require('../courses/courses.model');

const router = express.Router();

router.post('/', async (req, res, next) => {
  const { firstName, lastName, courseId } = req.body;

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

// router.delete('/:id', async (req, res, next) => {
//   const id = req.params.id;
//   try {
//     await Participant.findByIdAndDelete(id).exec();

//     res.json({
//       message: participantDeleted
//     });
//   } catch (err) {
//     next(err);
//   }
// });

module.exports = router;

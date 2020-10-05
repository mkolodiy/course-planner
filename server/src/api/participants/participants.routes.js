const express = require('express');
const Participant = require('./participants.model');

const router = express.Router();

router.post('/', async (req, res, next) => {
  const { firstName, lastName, course } = req.body;
  try {
    const participant = await Participant.create({
      firstName,
      lastName,
      course: course
    });

    res.json({
      participant: participant.getProperties()
    });
  } catch (err) {
    res.status(400);
    next(err);
  }
});

router.get('/', async () => {});

router.delete('/:id', async () => {});

module.exports = router;

const express = require('express');
const Participant = require('../participants/participants.model');
const WorklogEntry = require('../worklog-entries/worklogEntries.model');
const Course = require('../courses/courses.model');
const Worklog = require('./worklogs.model');

const router = express.Router();

router.post('/generate', async (req, res, next) => {
  const { courseId } = req.body;
  try {
    const course = await Course.findById(courseId).exec();
    const {
      type: { courseDuration }
    } = await couse.getProperties();

    const participants = await Participant.find({ course: courseId }).exec();
    const participantsProperties = Participant.getProperties(participants);

    const worklogs = [];
    for (i = 0; i < courseDuration; i++) {
      const worklogEntries = [];
      const worklog = await Worklog.create({
        date: new Date()
      });
      const { id: worklogId } = worklog.getProperties();

      for (const participant of participantsProperties) {
        const worklogEntry = await WorklogEntry.create({
          participant: participant.id,
          worklog: worklogId
        });
        worklogEntries.push(worklogEntry.getProperties().id);
      }

      await Worklog.findByIdAndUpdate(worklogId, { worklogEntries }).exec();
      worklogs.push(worklogId);
    }
    await Course.findByIdAndUpdate(courseId, { worklogs });

    res.json({
      worklogs
    });
  } catch (err) {
    next(err);
  }
});

router.get('/', async () => {});

module.exports = router;

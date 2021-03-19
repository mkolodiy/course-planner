const express = require('express');
const Participant = require('../participants/participants.model');
const WorklogEntry = require('../worklog-entries/worklogEntries.model');
const Course = require('../courses/courses.model');
const Worklog = require('./worklogs.model');

const router = express.Router();

router.post('/course/:id', async (req, res, next) => {
  const courseId = req.params.id;
  try {
    const course = await Course.findById(courseId).exec();
    await course.populate('type').execPopulate();
    await course.populate('participants').execPopulate();
    const {
      type: { courseDuration },
      participants
    } = course;

    const worklogs = [];
    for (i = 0; i < courseDuration; i++) {
      const worklogEntries = [];
      const worklog = await Worklog.create({
        date: new Date()
      });
      const { _id: worklogId } = worklog;

      console.log('participants', participants);
      for (const participant of participants) {
        const worklogEntry = await WorklogEntry.create({
          participant: participant._id,
          worklog: worklogId
        });
        console.log('worklogEntry', worklogEntry);
        worklogEntries.push(worklogEntry._id);
      }

      console.log('worklogEntries', worklogEntries);
      await Worklog.findByIdAndUpdate(worklogId, { worklogEntries }).exec();
      worklogs.push(worklogId);
    }
    console.log('worklogs', worklogs);
    await Course.findByIdAndUpdate(courseId, { worklogs });

    res.json({
      worklogs
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

router.get('/', async () => {});

module.exports = router;

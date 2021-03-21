const mongoose = require('mongoose');
const CourseType = require('../course-types/courseTypes.model');

const courseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    type: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CourseType',
      required: true
    },
    startDate: {
      type: Date,
      required: true,
      default: Date.now
    },
    endDate: {
      type: Date,
      required: true,
      default: Date.now
    },
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Participant'
      }
    ],
    worklogs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Worklog'
      }
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Course', courseSchema);

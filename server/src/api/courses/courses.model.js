const mongoose = require('mongoose');

const participantsSchema = new mongoose.Schema(
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
        ref: 'Paricipant'
      }
    ],
    worklogs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Worklog'
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model('Paricipant', participantsSchema);

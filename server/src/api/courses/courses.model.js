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

courseSchema.methods.getProperties = async function () {
  const courseType = await CourseType.findById(this.type).exec();
  return {
    id: this._id,
    name: this.name,
    type: courseType.getProperties(),
    startDate: this.startDate,
    endDate: this.endDate
  };
};

module.exports = mongoose.model('Course', courseSchema);

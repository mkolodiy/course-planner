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
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
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

courseSchema.statics.getProperties = async function (object) {
  if (Array.isArray(object)) {
    return await Promise.all(
      object.map(async entry => await entry.getProperties())
    );
  }

  return await object.getProperties();
};

module.exports = mongoose.model('Course', courseSchema);

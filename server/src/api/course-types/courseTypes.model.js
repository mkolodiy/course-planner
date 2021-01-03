const mongoose = require('mongoose');

const courseTypeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    courseDuration: {
      type: Number,
      required: true
    },
    unitDuration: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('CourseType', courseTypeSchema);

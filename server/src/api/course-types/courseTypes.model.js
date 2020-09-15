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

courseTypeSchema.methods.getProperties = function () {
  return {
    id: this._id,
    name: this.name,
    courseDuration: this.courseDuration,
    unitDuration: this.unitDuration
  };
};

courseTypeSchema.statics.getProperties = function (object) {
  if (Array.isArray(object)) {
    return object.map(entry => entry.getProperties());
  }

  return object.getProperties();
};

module.exports = mongoose.model('CourseType', courseTypeSchema);

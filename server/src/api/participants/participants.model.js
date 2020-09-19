const mongoose = require('mongoose');

const participantsSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course'
    },
    worklogEntries: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'WorklogEntry'
      }
    ]
  },
  { timestamps: true }
);

participantsSchema.methods.getProperties = function () {
  return {
    firstName: this.firstName,
    lastName: this.lastName
  };
};

participantsSchema.statics.getProperties = function (object) {
  if (Array.isArray(object)) {
    return object.map(entry => entry.getProperties());
  }

  return object.getProperties();
};

module.exports = mongoose.model('Paricipant', participantsSchema);

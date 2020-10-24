const mongoose = require('mongoose');

const worklogEntrySchema = new mongoose.Schema(
  {
    present: {
      type: Boolean,
      required: true,
      default: false
    },
    participant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Paricipant',
      required: true
    },
    worklog: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Worklog',
      required: true
    }
  },
  { timestamps: true }
);

worklogEntrySchema.methods.getProperties = function () {
  return {
    id: this._id,
    present: this.present,
    participant: this.participant
  };
};

worklogEntrySchema.statics.getProperties = function (object) {
  if (Array.isArray(object)) {
    return object.map(entry => entry.getProperties());
  }

  return object.getProperties();
};

module.exports = mongoose.model('WorklogEntry', worklogEntrySchema);

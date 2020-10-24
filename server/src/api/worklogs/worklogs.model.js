const mongoose = require('mongoose');

const worklogSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true
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

worklogSchema.methods.getProperties = function () {
  return {
    id: this._id
  };
};

module.exports = mongoose.model('Worklog', worklogSchema);

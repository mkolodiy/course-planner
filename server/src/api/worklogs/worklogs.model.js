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

module.exports = mongoose.model('Worklog', worklogSchema);

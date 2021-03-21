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
      ref: 'Participant',
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('WorklogEntry', worklogEntrySchema);

const mongoose = require('mongoose');
const MediaSchema = new mongoose.Schema(
  {
    path: {
      type: String,
    },
    extension: {
      type: String,
    },
  },
  { timestamps: true }
);

const Media = mongoose.model('Media', MediaSchema);

module.exports = Media;

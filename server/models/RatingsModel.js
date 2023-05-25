
const mongoose = require('mongoose');
const ratingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    store: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Store',
      required: true,
    },
    like: {
      type: Number,
      enumm: [0, 1, -1],
      default: 0,
    },
  },
  { timestamps: true }
);
const Rating = mongoose.model('Rating', ratingSchema);

module.exports = Rating;

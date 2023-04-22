const mongoose = require('mongoose');
const { Schema } = mongoose;

const locationSchema = new mongoose.Schema(
  {
    address: {
      type: String,
    },
    location: {
      type: {
        type: String,
      },
      coordinates: {
        type: [Number],
        index: '2dsphere',
      },
      formattedAddress: String,
    },
    store: {
      type: Schema.Types.ObjectId,
      ref: 'Store',
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;

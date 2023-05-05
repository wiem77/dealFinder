const mongoose = require('mongoose');
const { Schema } = mongoose;

const locationSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Point'],
    required: true,
  },
  coordinates: {
    type: [Number],
    required: true,
  },
  formattedAddress: {
    type: String,
  },
  city: {
    type: String,
  },
  zipcode: {
    type: String,
  },
  country: {
    type: String,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  store: {
    type: Schema.Types.ObjectId,
    ref: 'Store',
  },
});

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;

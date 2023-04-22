const mongoose = require('mongoose');
const { geocodeAddress } = require('../utils/geocoder');
const Location = require('./LocationModel');
const { Schema } = mongoose;

const storeSchema = new mongoose.Schema({
  store_name: {
    type: String,
    required: [true, 'Please add a name'],
    unique: true,
    trim: true,
    maxlength: [50, 'Name cannot be more than 50 characters'],
  },
  phone: {
    type: String,
    maxlength: [8, 'Phone number cannot be longer than 8 characters'],
  },
  email: {
    type: String,
  },
  locations: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Location',
      required: [true, 'Please add at least one location'],
    },
  ],
  vouchers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Voucher',
    },
  ],
  rating: {
    type: Number,
    min: [0, 'Rating cannot be less than 0'],
    max: [5, 'Rating cannot be more than 5'],
    default: 0,
  },
});

storeSchema.pre('save', async function (next) {
  try {
    for (let i = 0; i < this.locations.length; i++) {
      const address = this.locations[i].address;
      const location = await geocodeAddress(address);
      this.locations[i].location = location;
    }
    next();
  } catch (error) {
    next(error);
  }
});

const Store = mongoose.model('Store', storeSchema);

module.exports = Store;

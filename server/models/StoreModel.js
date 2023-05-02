const mongoose = require('mongoose');

const { Schema } = mongoose;

const storeSchema = new mongoose.Schema({
  store_name: {
    type: String,
    required: [true, 'Please add a name'],
    unique: true,
    trim: true,
    maxlength: [50, 'Name cannot be more than 50 characters'],
  },
  store_image: [{ type: Schema.Types.ObjectId, ref: 'Media' }],
  phone: {
    type: String,
    maxlength: [8, 'Phone number cannot be longer than 8 characters'],
  },
  email: {
    type: String,
  },
  webSite: {
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
      type: Schema.Types.ObjectId,
      ref: 'Voucher',
    },
  ],
  sub_categories: [
    {
      type: Schema.Types.ObjectId,
      ref: 'SubCategory',
    },
  ],
  rating: {
    type: Number,
    min: [0, 'Rating cannot be less than 0'],
    max: [5, 'Rating cannot be more than 5'],
    default: 0,
  },
});

const Store = mongoose.model('Store', storeSchema);

module.exports = Store;

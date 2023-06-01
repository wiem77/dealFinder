const mongoose = require('mongoose');

const { Schema } = mongoose;

const storeSchema = new mongoose.Schema(
  {
    locations: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Location',
        required: [true, 'Please add at least one location'],
      },
    ],
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
    description: { type: String },
    email: {
      type: String,
    },
    sub_categories: [
      {
        type: Schema.Types.ObjectId,
        ref: 'SubCategory',
      },
    ],
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

    rating: {
      type: Number,

      default: 0,
    },

    accesscode: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true }
);

const Store = mongoose.model('Store', storeSchema);

module.exports = Store;

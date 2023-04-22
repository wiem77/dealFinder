const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    items: [
      {
        voucher: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Voucher',
          required: true,
        },

        added_at: {
          type: Date,
          default: Date.now(),
        },
        valid_until: {
          type: Date,
          default: () => new Date(+new Date() + 24 * 60 * 60 * 1000), // expires after 24h
        },
        is_Valid: {
          type: Boolean,
        },
      },
    ],
    status: {
      type: Boolean,
      default: true,
    },
    Date_Add: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Cart', cartSchema);

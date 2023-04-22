const mongoose = require('mongoose');

const voucherSchema = new mongoose.Schema(
  {
    nameV: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },

    validity_date: {
      type: Date,
      required: true,
    },

    available_count: {
      type: Number,
      required: true,
    },
    qrcode: {
      type: String,
      required: true,
    },
    promo: {
      type: Number,
      required: true,
    },
    is_available: {
      type: Boolean,
      default: true,
    },
    store: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Store',
      required: true,
    },
  },
  { timestamps: true }
);

const Voucher = mongoose.model('Voucher', voucherSchema);

module.exports = Voucher;

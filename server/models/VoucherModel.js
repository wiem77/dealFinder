const mongoose = require('mongoose');
const QrCode = require('./qrCodeModel');
const { Schema } = mongoose;
const voucherSchema = new mongoose.Schema(
  {
    name_V: {
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

    available_vouchers: {
      type: Number,
      required: true,
    },

    discount: {
      type: Number,
      required: true,
    },
    is_available: {
      type: Boolean,
      default: true,
    },
    store: {
      type: Schema.Types.ObjectId,
      ref: 'Store',
      required: true,
    },
  },
  { timestamps: true }
);

const Voucher = mongoose.model('Voucher', voucherSchema);

module.exports = Voucher;

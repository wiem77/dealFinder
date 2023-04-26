const mongoose = require('mongoose');

const { Schema } = mongoose;
const qrCodeSchema = new mongoose.Schema({
  data: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  validUntil: {
    type: Date,
    required: true,
  },
  voucher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Voucher',
  },
});

const QrCode = mongoose.model('QrCode', qrCodeSchema);
module.exports = QrCode;

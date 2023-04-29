const mongoose = require('mongoose');

const OtpVerificationSchema = new mongoose.Schema({
  email: { type: String },
  userId: String,
  otp: String,
  createdAt: Date,
  expiredAt: Date,
});

const Otp = mongoose.model('Otp', OtpVerificationSchema);

module.exports = Otp;

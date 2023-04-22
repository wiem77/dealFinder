const mongoose = require('mongoose');

const UserVerificationSchema = new mongoose.Schema({
  userId:String,
  uniqueString:String,
  expiredAt:Date,

});

const User = mongoose.model('UserVerification', UserVerificationSchema);

module.exports = User;
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const storeTokenSchema = new Schema({
  storeId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 30 * 86400, //30Days
  },
});

const StoreToken = mongoose.model('StoreToken', storeTokenSchema);
module.exports = StoreToken;

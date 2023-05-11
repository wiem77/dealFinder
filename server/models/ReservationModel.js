const mongoose = require('mongoose');
const { Schema } = mongoose;
const ReservationSchema = new mongoose.Schema(
  {
    voucher: {
      type: Schema.Types.ObjectId,
      ref: 'Voucher',
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    qrCode: {
      type: String,
    },
    used: {
      type: Boolean,
      default: false,
    },
    archived: { type: Boolean, default: false },
    // expiry: {
    //   type: Date,
    //   default: function () {
    //     return new Date(+new Date() + 48 * 60 * 60 * 1000);
    //   },
    // },
    expiry: {
      type: Date,
      default: function () {
        const expireDate = new Date();
        expireDate.setTime(expireDate.getTime() + 2 * 60 * 1000);
        return expireDate;
      },
    },
    vouchers_incremented: { type: Boolean, default: false },
    expiredStatus: { type: Boolean, default: false },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Reservation = mongoose.model('Reservation', ReservationSchema);

ReservationSchema.methods.isAlreadyReserved = async function (
  userId,
  voucherId
) {
  const reservation = await this.model('Reservation').findOne({
    user: userId,
    voucher: voucherId,
  });

  return reservation !== null;
};

module.exports = Reservation;

const mongoose = require('mongoose');
const { Schema } = mongoose;
const ReservationSchema = new mongoose.Schema(
  {
    voucher: {
      type: Schema.Types.ObjectId,
      ref: 'Voucher',
      required: true,
      unique: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    used: {
      type: Boolean,
      default: false,
    },
    expiry: {
      type: Date,
      default: function () {
        return new Date(+new Date() + 48 * 60 * 60 * 1000);
      },
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

ReservationSchema.index({ voucher: 1, user: 1 }, { unique: true });

const Reservation = mongoose.model('Reservation', ReservationSchema);

ReservationSchema.methods.isAlreadyReserved = async function (userId, voucherId) {
    const reservation = await this.model('Reservation').findOne({
      user: userId,
      voucher: voucherId
    });
  
    return reservation !== null;
  };
  

module.exports = Reservation;

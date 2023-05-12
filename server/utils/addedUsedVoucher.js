const schedule = require('node-schedule');
const Reservation = require('../models/ReservationModel');
const Voucher = require('../models/VoucherModel');
const User = require('../models/User');
module.exports.usedVoucher = async () => {
  console.log('test1');
  const usedVoucher = await Reservation.find({
    expiry: { $lt: new Date() },
    expiredStatus: false,
    vouchers_incremented: { $ne: true },
  }).exec();
  console.log('expiredReservations', expiredReservations);
  if (expiredReservations.length > 0) {
    for (const reservation of expiredReservations) {
      const voucherId = reservation.voucher;
      await Voucher.updateOne(
        { _id: voucherId },
        { $inc: { available_vouchers: 1 } }
      ).exec();

      const user = await User.findById(reservation.user);
      if (user) {
        const index = user.reservedVouchers.indexOf(reservation._id);
        if (index > -1) {
          user.reservedVouchers.splice(index, 1);
          user.archivedVouchers.push(reservation._id);
          await user.save();
        }
      }
    }
    await Reservation.updateMany(
      { _id: { $in: expiredReservations.map((r) => r._id) } },
      {
        $set: {
          expiredStatus: true,
          vouchers_incremented: true,
          archived: true,
        },
      }
    ).exec();
  }
};

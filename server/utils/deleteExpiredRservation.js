const schedule = require('node-schedule');
const Reservation = require('../models/ReservationModel');
const Voucher = require('../models/VoucherModel');
const User = require('../models/User');
module.exports.updateExpiredReservations = async () => {
  console.log('test1');
  const expiredReservations = await Reservation.find({
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

// module.exports.updateExpiredReservations = async () => {
//   console.log('test1');
//   const expiredReservations = await Reservation.find({
//     expiry: { $lt: new Date() },
//     expiredStatus: false,
//     vouchers_incremented: { $ne: true },
//   }).exec();

//   if (expiredReservations.length > 0) {
//     for (const reservation of expiredReservations) {
//       const voucherId = reservation.voucher;
//       await Voucher.updateOne(
//         { _id: voucherId },
//         { $inc: { available_vouchers: 1 } }
//       ).exec();
//     }
//     await Reservation.updateMany(
//       { _id: { $in: expiredReservations.map((r) => r._id) } },
//       { $set: { expiredStatus: true, vouchers_incremented: true } }
//     ).exec();
//   }
// };

// module.exports.deleteExpiredReservationsJob = schedule.scheduleJob(
//   '0 * * * *',
//   async () => {
//     try {
//       const reservations = await Reservation.find().exec();

//       for (const reservation of reservations) {
//         if (reservation.expiredDate.getTime() < new Date().getTime()) {
//           await Reservation.deleteOne({ _id: reservation._id }).exec();

//           await Voucher.updateOne(
//             { _id: reservation.voucher },
//             { $inc: { available_vouchers: 1 } }
//           ).exec();
//         }
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   }
// );

// module.exports.deleteExpiredReservations = async () => {
//   console.log('test');

//   const expiredReservations = await Reservation.find({
//     expiry: { $lt: new Date() },
//   }).exec();
//   console.log(expiredReservations);
//   if (expiredReservations.length > 0) {
//     for (const reservation of expiredReservations) {
//       const voucherId = reservation.voucher;
//       console.log('test2');

//       const v = await Voucher.updateOne(
//         { _id: voucherId },
//         { $inc: { available_vouchers: 1 } }
//       ).exec();
//       console.log('v,', v);
//       await Reservation.deleteOne({ _id: reservation._id }).exec();
//     }
//   }
// };

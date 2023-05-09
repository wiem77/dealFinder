const Store = require('../../models/StoreModel');
const Voucher = require('../../models/VoucherModel');
const User = require('../../models/User');
const Reservation = require('../../models/ReservationModel');
module.exports.createReservation = async (req, res) => {
  const { userId, voucherId } = req.params;

  console.log(voucherId, userId);
  try {
    const voucher = await Voucher.findOne({
      _id: voucherId,
      is_available: true,
      available_vouchers: { $gt: 0 },
      validity_date: { $gt: new Date() },
    }).exec();

    if (!voucher) {
      return res
        .status(404)
        .json({ message: 'Voucher not found or unavailable.' });
    }

    if (voucher.available_vouchers === 0) {
      return res.status(400).json({ message: 'No available vouchers.' });
    }

    if (
      voucher.validity_date.getTime() - new Date().getTime() <
      24 * 60 * 60 * 1000
    ) {
      return res.status(400).json({ message: 'Voucher expires too soon.' });
    }

    const isReserved = await Reservation.findOne({
      voucher: voucherId,
      user: userId,
    }).exec();

    if (isReserved) {
      return res
        .status(400)
        .json({ message: 'Voucher already reserved by this user.' });
    }
    const isAlreadyReserved = await Reservation.exists({
      user: userId,
      voucher: voucherId,
    });
    if (isAlreadyReserved) {
      return res
        .status(400)
        .json({ message: 'You have already reserved this voucher.' });
    }
    const reservation = new Reservation({
      user: userId,
      voucher: voucherId,
    });
    await reservation.save();
    await Voucher.updateOne(
      { _id: voucherId },
      { $inc: { available_vouchers: -1 } }
    ).exec();

    return res.status(201).json({
      message: 'Reservation created successfully.',
      data: reservation,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error.' });
  }
};

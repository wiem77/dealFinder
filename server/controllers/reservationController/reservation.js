const Store = require('../../models/StoreModel');
const Voucher = require('../../models/VoucherModel');
const User = require('../../models/User');
const Reservation = require('../../models/ReservationModel');

module.exports.createReservation = async (req, res) => {
  const { userId, voucherId } = req.params;
  console.log('reservation ');
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
        .json({ message: "Le coupon n'a pas été trouvé ou est indisponible." });
    }

    if (voucher.available_vouchers === 0) {
      return res.status(400).json({ message: 'Plus de coupons disponibles.' });
    }

    if (
      voucher.validity_date.getTime() - new Date().getTime() <
      24 * 60 * 60 * 1000
    ) {
      return res
        .status(400)
        .json({ message: "Date d'expiration du coupon dépassée." });
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
        .json({ message: 'Vous avez déjà réservé ce coupon' });
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

    const user = await User.findByIdAndUpdate(
      userId,
      { reservedVouchers: reservation._id },
      { new: true }
    ).exec();

    return res.status(201).json({
      message:
        "Félicitations, vous avez réservé votre coupon. Utilisez-le avant l'expiration des 48 heures.",
      data: reservation,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error.' });
  }
};
module.exports.getReservationWithUserId = async (req, res) => {
  const { userId } = req.params;
  console.log('reservationByUserID ');
  try {
    const reservation = await Reservation.find({ user: userId })
      .populate('user')
      .populate('voucher');
    if (!reservation) {
      return res
        .status(404)
        .json({ message: "Aucune réservation n'a été effectuée.." });
    }
    return res.status(201).json({
      message: 'votre liste de reservation',
      data: reservation,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error.' });
  }
};

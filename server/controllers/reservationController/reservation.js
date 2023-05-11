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
  console.log('reservationByUserID ', userId);
  try {
    const reservation = await Reservation.find({
      user: userId,
      $or: [
        { expiredStatus: false },
        {
          expiredStatus: true,
          used: false,
          'voucher.available_vouchers': { $gt: 0 },
          // 'voucher.validity_date': { $gt: Date.now() },
        },
        { archived: true },
      ],
    })
      .populate(
        'user',
        '-password -confirmpassword -picturePath -roles -favorite_stores '
      )
      .populate('voucher');
    console.log(reservation);
    if (reservation.length === 0) {
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

exports.resetArchivedReservations = async (req, res) => {
  try {
    const { reservationId, userId } = req.params;
    console.log(req.params);
    const user = await User.findOne({
      _id: userId,
      archivedVouchers: reservationId,
    });
    console.log('req.user._id', userId);
    if (!user) {
      return res
        .status(404)
        .json({ message: "Réservation introuvable dans l'archive " });
    }

    const reservation = await Reservation.findOne({
      _id: reservationId,
      used: false,
      vouchers_incremented: false,
      archived: true,
      'voucher.validity_date': { $gt: Date.now() },
      'voucher.available_vouchers': { $gt: 0 },
    });
    if (!reservation) {
      return res.status(404).json({
        message: "La réservation n'est pas éligible pour être réinitialisée",
      });
    }

    await reservation.voucher.updateOne({
      $dec: { available_vouchers: 1 },
    });

    await reservation.updateOne({
      vouchers_incremented: true,
    });

    return res
      .status(200)
      .json({ message: 'La réservation a été réinitialisée avec succès' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const Store = require('../../models/StoreModel');
const Voucher = require('../../models/VoucherModel');
const User = require('../../models/User');
const Reservation = require('../../models/ReservationModel');
const { generateQrCode } = require('../../utils/generateQrCode');
const generateReservationCode = require('../../utils/generateOTP');

module.exports.verifyCodeReservation = async (req, res) => {
  const { resCode, store_id } = req.params;
  console.log(resCode, store_id);
  console.log(resCode);
  console.log('reservationCode ', resCode);
  try {
    const reservation = await Reservation.findOne({
      reservationCode: resCode,
      $and: [
        {
          used: false,
          // 'voucher.validity_date': { $gt: Date.now() },
        },
        { archived: false },
      ],
    })
      .populate(
        'user',
        '-password -confirmpassword -picturePath -roles -favorite_stores -reservedVouchers '
      )
      .populate('voucher', '-store');

    console.log(reservation);

    if (!reservation) {
      return res.status(404).json({ message: 'QrCode invalide..' });
    }

    const voucher = await Voucher.findOne({
      _id: reservation.voucher,
      store: store_id,
    });

    if (!voucher) {
      return res
        .status(404)
        .json({ message: 'Voucher not found for this store.' });
    }

    reservation.archived = true;
    reservation.used = true;
    reservation.qrCode = undefined;

    await reservation.save();

    // const user = await User.findById(reservation.user._id);
    // user.reservedVouchers.pull(reservation._id);
    // user.usedVouchers.push(reservation._id);
    // await user.save();

    return res.status(201).json({
      message: 'Réservation valider ',
      data: reservation,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};
module.exports.createReservation = async (req, res) => {
  const { userId, voucherId } = req.params;
  console.log('userId ', userId);
  console.log(voucherId, userId);
  try {
    const voucher = await Voucher.findOne({
      _id: voucherId,
      is_available: true,
      available_vouchers: { $gt: 0 },
      validity_date: { $gt: new Date() },
    })
      .populate({
        path: 'store',
        select: 'store_name',
      })
      .exec();

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

    const user = await User.findById(userId)
      .populate('reservedVouchers')
      .exec();
    console.log('user', user);

    const isReserved = user.reservedVouchers.find(
      (r) => r.voucher.toString() === voucherId
    );

    if (isReserved) {
      return res
        .status(400)
        .json({ message: 'Voucher already reserved by this user.' });
    }

    const reservationCode = await generateReservationCode();
    let voucherData = {
      name_v: voucher.name_V,
      validity_date: voucher.validity_date,
      discount: voucher.discount,
      is_available: voucher.is_available,
    };

    let stringdata = JSON.stringify({
      reservationCode,
      voucher: voucherData,
    });

    generateQrCode(stringdata, async (err, url) => {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .json({ message: 'Erreur lors de la génération de QR code.' });
      }
      console.log('QR code URL:', url);
      const reservation = new Reservation({
        user: userId,
        voucher: voucherId,
        qrCode: url,
        reservationCode: reservationCode,
      });
      console.log('reservation', reservation);

      await reservation.save();

      await Voucher.updateOne(
        { _id: voucherId },
        { $inc: { available_vouchers: -1 } }
      ).exec();

      user.reservedVouchers.push(reservation._id);
      await user.save();

      return res.status(201).json({
        message:
          "Félicitations, vous avez réservé votre coupon. Utilisez-le avant l'expiration des 48 heures.",
        data: reservation,
      });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error.' });
  }
};
module.exports.getReservationByCode = async (req, res) => {
  const { reservationCode } = req.params;

  try {
    const reservation = await Reservation.findOne({ reservationCode })
      .populate(
        'voucher',
        'name_V description validity_date available_vouchers discount is_available'
      )
      .exec();

    if (!reservation) {
      return res.status(404).json({ message: 'Réservation introuvable' });
    }

    res.json({ reservation });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message:
        "Une erreur s'est produite lors de la récupération de la réservation",
    });
  }
};
// module.exports.createReservation = async (req, res) => {
//   const { userId, voucherId } = req.params;
//   console.log('userId ', userId);
//   console.log(voucherId, userId);
//   try {
//     const voucher = await Voucher.findOne({
//       _id: voucherId,
//       is_available: true,
//       available_vouchers: { $gt: 0 },
//       validity_date: { $gt: new Date() },
//     }).exec();

//     if (!voucher) {
//       return res
//         .status(404)
//         .json({ message: "Le coupon n'a pas été trouvé ou est indisponible." });
//     }

//     if (voucher.available_vouchers === 0) {
//       return res.status(400).json({ message: 'Plus de coupons disponibles.' });
//     }

//     if (
//       voucher.validity_date.getTime() - new Date().getTime() <
//       24 * 60 * 60 * 1000
//     ) {
//       return res
//         .status(400)
//         .json({ message: "Date d'expiration du coupon dépassée." });
//     }

//     const isReserved = await Reservation.findOne({
//       voucher: voucherId,
//       user: userId,
//     }).exec();

//     if (isReserved) {
//       return res
//         .status(400)
//         .json({ message: 'Voucher already reserved by this user.' });
//     }

//     const isAlreadyReserved = await Reservation.exists({
//       user: userId,
//       voucher: voucherId,
//     });

//     if (isAlreadyReserved) {
//       return res
//         .status(400)
//         .json({ message: 'Vous avez déjà réservé ce coupon' });
//     }

//     const userInfo = await User.findOne(
//       { _id: userId },
//       'nom prenom  telephone age sexe email'
//     );
//     console.log(userInfo);
//     const reservationCode = await generateReservationCode();
//     let stringdata = JSON.stringify(reservationCode);
//     generateQrCode(stringdata, async (err, url) => {
//       if (err) {
//         console.error(err);
//         return res
//           .status(500)
//           .json({ message: 'Erreur lors de la génération de QR code.' });
//       }
//       console.log('QR code URL:', url);
//       const reservation = new Reservation({
//         user: userId,
//         voucher: voucherId,
//         qrCode: url,
//         reservationCode: reservationCode,
//       });
//       console.log('reservation', reservation);

//       await reservation.save();

//       await Voucher.updateOne(
//         { _id: voucherId },
//         { $inc: { available_vouchers: -1 } }
//       ).exec();

//       const user = await User.findByIdAndUpdate(
//         userId,
//         { reservedVouchers: reservation._id },
//         { new: true }
//       ).exec();

//       return res.status(201).json({
//         message:
//           "Félicitations, vous avez réservé votre coupon. Utilisez-le avant l'expiration des 48 heures.",
//         data: reservation,
//       });
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: 'Server error.' });
//   }
// };
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
module.exports.getUserReservations = async (req, res) => {
  const userId = req.params.userId;

  try {
    const reservations = await Reservation.find({
      user: userId,
      $and: [{ used: true }],
    }).populate({
      path: 'voucher',
      populate: {
        path: 'store',
        select: 'store_name store_image',
      },
    });

    res.json(reservations);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error:
        "Une erreur est survenue lors de la récupération des réservations de l'utilisateur.",
    });
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

    if (!user) {
      return res
        .status(404)
        .json({ message: "Réservation introuvable dans l'archive " });
    }
    console.log(user);
    console.log(reservationId);
    const reservation = await Reservation.findOne({
      _id: reservationId,
      used: false,

      archived: true,
      // 'voucher.validity_date': { $gt: Date.now() },
      // 'voucher.available_vouchers': { $gt: 0 },
    }).populate('voucher');
    console.log('reservation', reservation);
    if (!reservation) {
      return res.status(404).json({
        message: "La réservation n'est pas éligible pour être réinitialisée",
      });
    }

    await reservation.voucher.updateOne({
      $inc: { available_vouchers: -1 },
    });

    await reservation.updateOne({
      vouchers_incremented: true,
      archived: false,
      createdAt: Date.now(),
      expiry: new Date(Date.now() + 48 * 60 * 60 * 1000),
      expiredStatus: false,
    });
    await User.updateOne(
      { _id: userId },
      {
        $pull: { archivedVouchers: reservationId },
        $addToSet: { reservedVouchers: reservationId },
      }
    );

    return res
      .status(200)
      .json({ message: 'La réservation a été réinitialisée avec succès' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports.getAllReservationByIDUSer = async (req, res) => {
  const userId = req.params.userId;
  console.log('userId', userId);
  try {
    const reservations = await Reservation.find({
      user: userId,
      $and: [{ used: false }],
    })
      .populate({
        path: 'voucher',
        populate: {
          path: 'store',
          select: 'store_name store_image',
        },
      })
      .select(
        '-user.password -user.confirmpassword -user.picturePath  -user.age -user.sexe  -user.favorite_stores '
      );

    console.log(reservations);

    if (reservations.length === 0) {
      return res
        .status(404)
        .json({ message: "Aucune réservation n'a été effectuée." });
    }
    console.log(reservations);
    return res.status(201).json({
      message: 'Votre liste de réservations',
      data: reservations,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erreur du serveur.' });
  }
};
module.exports.deleteReservation = async (req, res) => {
  const reservationId = req.params.reservationId;
  try {
    const reservation = await Reservation.findById(reservationId);

    if (!reservation) {
      throw new Error('Réservation introuvable');
    }

    await Reservation.deleteOne({ _id: reservationId });

    await User.findByIdAndUpdate(reservation.user, {
      $pull: { reservedVouchers: reservationId },
    });

    if (reservation.archived) {
      await User.findByIdAndUpdate(reservation.user, {
        $pull: { archivedVouchers: reservationId },
      });
    } else {
      await Voucher.findByIdAndUpdate(reservation.voucher, {
        $inc: { available_vouchers: 1 },
      });
    }

    console.log('Réservation supprimée avec succès');
    res.status(200).json({ success: true, data: reservation });
  } catch (error) {
    console.error(
      'Erreur lors de la suppression de la réservation:',
      error.message
    );
    res.status(500).json({ success: false, error: 'Server error' });
  }
};
module.exports.checkReservation = async (req, res) => {
  const userId = req.params.userId;
  const storeId = req.params.storeId;

  try {
    const user = await User.findById(userId).populate('reservedVouchers');

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: 'Utilisateur non trouvé.' });
    }

    const reservedVouchers = user.reservedVouchers;

    let hasValidReservation = false;
    let hasExpiredReservation = false;

    for (const reservedVoucher of reservedVouchers) {
      if (
        reservedVoucher.voucher &&
        reservedVoucher.voucher.store &&
        reservedVoucher.voucher.store.toString() === storeId &&
        !reservedVoucher.archived &&
        !reservedVoucher.used
      ) {
        hasValidReservation = true;
        break;
      }

      if (
        reservedVoucher.voucher &&
        reservedVoucher.voucher.store &&
        reservedVoucher.voucher.store.toString() === storeId &&
        reservedVoucher.archived &&
        !reservedVoucher.used
      ) {
        hasExpiredReservation = true;
      }
    }

    if (hasValidReservation) {
      return res.status(400).json({
        success: false,
        message: 'Vous avez déjà réservé un coupon valide dans ce magasin.',
      });
    }

    if (hasExpiredReservation) {
      return res.status(400).json({
        success: false,
        message: 'Vous avez une réservation expirée pour ce magasin.',
      });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Erreur lors de la vérification de la réservation :', error);
    return res.status(500).json({
      success: false,
      message:
        "Une erreur s'est produite lors de la vérification de la réservation.",
    });
  }
};

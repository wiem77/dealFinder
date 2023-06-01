const Location = require('../../models/LocationModel');
const Store = require('../../models/StoreModel');
const User = require('../../models/User'); // Importez le modèle User
const Voucher = require('../../models/VoucherModel');
const { getLocationAdrs } = require('../../utils/generateAdresse');
module.exports.getRecentVouchers = async (req, res) => {
  try {
    const vouchers = await Voucher.find({})
      .sort({ createdAt: 'desc' })
      .populate('store', 'store_name');
    const vouchersWithCreatedAt = vouchers.map((voucher) => {
      return {
        _id: voucher._id,
        name_V: voucher.name_V,

        validity_date: voucher.validity_date,
        available_vouchers: voucher.available_vouchers,
        discount: voucher.discount,
        is_available: voucher.is_available,
        store: voucher.store,
        createdAt: voucher.createdAt,
      };
    });

    res.status(200).json(vouchersWithCreatedAt);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message:
        "Une erreur s'est produite lors de la récupération des vouchers.",
    });
  }
};
module.exports.getNewlyAddedStores = async (req, res) => {
  try {
    const stores = await Store.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .populate('locations', 'city')
      .populate('sub_categories', 'subCategory_name');
    const storessWithCreatedAt = stores.map((store) => {
      return {
        _id: store._id,
        store_name: store.store_name,

        sub_categories: store.sub_categories,
        locations: store.locations,

        createdAt: store.createdAt,
      };
    });

    res.status(200).json(storessWithCreatedAt);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Erreur lors de la récupération des nouveaux stores',
    });
  }
};
module.exports.addLocationStore = async (req, res) => {
  const latitude = req.body.latitude;
  const longitude = req.body.longitude;
  const storeId = req.params.id;

  console.log(longitude, latitude, storeId);
  try {
    const locationDetails = await getLocationAdrs([longitude, latitude]);

    const location = new Location({
      type: 'Point',
      coordinates: locationDetails.coordinates,
      formattedAddress: locationDetails.formattedAddress,
      city: locationDetails.city,
      country: locationDetails.country,
      zipcode: locationDetails.zipcode,
      store: storeId,
    });
    console.log(location);
    const newLocation = await location.save();
    const store = await Store.findByIdAndUpdate(
      storeId,
      { $push: { locations: newLocation._id } },
      { new: true }
    );

    res.status(201).json({
      success: true,
      data: location,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Erreur lors de l'ajout de la localisation",
    });
  }
};

module.exports.getUsersAndCountRoles = async (req, res) => {
  try {
    const totalUsersCount = await User.countDocuments();

    const visitorsCount = await User.countDocuments({ roles: 'visiteur' });
    const visitorsPercentage = (visitorsCount / totalUsersCount) * 100;

    const consumersCount = await User.countDocuments({ roles: 'consommateur' });
    const consumersPercentage = (consumersCount / totalUsersCount) * 100;

    const totalStoresCount = await Store.countDocuments();

    const progressingStoresCount = await Store.countDocuments({
      vouchers: { $exists: true, $not: { $size: 0 } },
    });
    const progressingStoresPercentage = (
      (progressingStoresCount / totalStoresCount) *
      100
    ).toFixed(2);
    const availableVouchersCount = await Voucher.countDocuments({
      is_available: true,
    });

    // Calculez la moyenne des vouchers disponibles
    const availableVouchersAvgDiscount = await Voucher.aggregate([
      { $match: { is_available: true } },
      { $group: { _id: null, avgDiscount: { $avg: '$discount' } } },
    ]);

    const avgDiscount =
      availableVouchersAvgDiscount.length > 0
        ? availableVouchersAvgDiscount[0].avgDiscount
        : 0;

    const users = await User.find();

    res.json({
      success: true,
      visitorsCount,
      visitorsPercentage,
      consumersCount,
      consumersPercentage,
      totalStoresCount,
      progressingStoresPercentage,
      progressingStoresCount,
      availableVouchersCount,
      avgDiscount,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const Category = require('../../models/CategoryModel');
const Voucher = require('../../models/VoucherModel');
const Location = require('../../models/LocationModel');
const Store = require('../../models/StoreModel');
const SubCategory = require('../../models/subCategoryModel');
const Media = require('../../models/MediaModel');
const { storeValidation } = require('../../utils/ValidationSchema');

const sendEmail = require('../../utils/generatEmailValidation');
const getLocationAdrs = require('../../utils/generateAdresse').getLocationAdrs;
exports.addStore = async (req, res, next) => {
  console.log('add2...');
  console.log(req.body);
  const {
    email,
    store_name,
    sub_categories,
    coordinates,
    phone,
    webSite,
    description,
  } = req.body;
  console.log(sub_categories);
  // console.log(req.file);
  const store_image = req.file;
  try {
    const existingStore = await Store.findOne({
      store_name,
      email: email,
    });
    if (existingStore) {
      throw new Error('A store with the same name and email already exists');
    }
    // if (!store_image) {
    //   throw new Error('Logo required');
    // }
    // const fileName = req.file.filename;

    // const media = new Media({
    //   path: `C:/Users/User/Desktop/All/DealFinder/server/controllers/image/${fileName}`,
    //   extension: fileName.split('.').pop(),
    // });

    // await media.save();
    const locationDetails = await getLocationAdrs(coordinates);

    const location = new Location({
      type: 'Point',
      coordinates: locationDetails.coordinates,
      formattedAddress: locationDetails.formattedAddress,
      city: locationDetails.city,
      country: locationDetails.country,
      zipcode: locationDetails.zipcode,
      store: Store._id,
    });

    const savedLocation = await location.save();
    console.log(sub_categories);
    if (!req.body.sub_categories) {
      return res.status(400).send({ message: 'sub_categories is required' });
    }

    const store = new Store({
      store_name: store_name,
      phone: phone,
      email: email,
      webSite: webSite,
      description: description,
      locations: [savedLocation._id],
      sub_categories: [],
      vouchers: [],
    });
    for (const subCategoryId of sub_categories) {
      const subCategory = await SubCategory.findById(subCategoryId);
      console.log('FindSub', subCategory);
      if (subCategory) {
        store.sub_categories.push(subCategory._id);
        subCategory.stores.push(store._id);
        await subCategory.save();
      } else {
        return res.status(400).send({ message: 'sub_categories  dont exist ' });
      }
    }

    const savedStore = await store.save();
    console.log(savedStore);
    const populatedStore = await Store.findById(savedStore._id)
      .populate('locations')
      .populate('sub_categories');

    const emailText = `Bonjour ${savedStore.store_name},\n\nNous sommes ravis de vous informer que votre boutique a été ajoutée à notre application. Nous espérons que notre application vous sera utile pour développer votre activité. N'hésitez pas à nous contacter si vous avez des questions ou des commentaires.\n\nCordialement,\nL'équipe de l'application`;
    console.log('emailText', emailText);

    await sendEmail(
      savedStore.email,
      'Veuillez vérifier votre adresse e-mail',
      emailText
    );

    res.status(201).send({
      message:
        'Store created successfully, a verification email has been sent to your email address',
      store: populatedStore,
    });
  } catch (error) {
    next(error);
  }
};

// exports.getAllStores = async (req, res) => {
//   try {
//     const stores = await Store.find({})
//       .populate('locations', 'formattedAddress city zipcode')
//       .populate('sub_categories', 'subCategory_name category')
//       .populate('vouchers', 'discount name_V')
//       .lean();

//     res.status(200).json(stores);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: 'Error getting all stores.' });
//   }
// };
exports.getAllStores = async (req, res) => {
  try {
    const stores = await Store.find({})
      .populate('locations', 'formattedAddress city zipcode')
      .populate({
        path: 'sub_categories',
        populate: {
          path: 'category',
          select: 'category_name',
        },
        select: 'subCategory_name category',
      })
      .populate('vouchers', 'discount name_V')
      .lean();

    res.status(200).json(stores);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Error getting all stores.' });
  }
};

module.exports.getOneStore = (req, res) => {
  console.log('ONE Store..');
  const storeId = req.params.id;
  const store_name = req.params.name;
  console.log(storeId);
  Store.findOne({
    $or: [{ _id: storeId }, { store_name: store_name }],
  })
    .populate('locations')
    .populate('vouchers')
    .populate('sub_categories')
    .then((store) => {
      if (!store) {
        return res.status(400).send({ success: false, msg: 'store not found' });
      }
      res.status(200).send({ success: true, store });
      console.log(store);
    })
    .catch((error) => {
      res.status(400).send({ success: false, msg: error.message });
    });
};
exports.getAllStoresWithLocations = (req, res) => {
  console.log('sotresLocations');
  Store.find({})
    .populate('locations')
    .then((stores) => {
      res.status(200).json(stores);
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ error: 'Error getting all stores with locations.', err });
    });
};
exports.getStoreByName = (req, res) => {
  const storeName = req.params.name;
  console.log(storeName);
  Store.findOne({ store_name: storeName })
    .populate('locations')
    .then((store) => {
      if (!store) {
        return res.status(404).json({ error: 'Store not found.' });
      }
      res.status(200).json(store);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: 'Error getting store by name.' });
    });
};

module.exports.deleteStore = async (req, res) => {
  const storeId = req.params.id;
  console.log('storeee', storeId);
  Store.findOne({
    _id: storeId,
  })
    .populate('vouchers')
    .then((store) => {
      if (!store) {
        return res.status(400).send({ msg: 'Store does not exist' });
      }
      Voucher.deleteMany({
        _id: { $in: store.vouchers },
      }).then(() => {
        console.log('Vouchers deleted');
      });
      Store.deleteOne({ _id: store._id }).then(() => {
        res.status(200).send({
          success: true,
          msg: 'store deleted',
          deletedCategory: store,
        });
        console.log('store deleted:', store);
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(400).send({ success: false, msg: error.message });
    });
};

exports.updateStore = (req, res) => {
  const storeId = req.params.id;

  console.log(storeId);
  Store.findById(storeId)
    .populate('locations')
    .populate('sub_categories')
    .populate('vouchers')
    .exec()
    .then(async (store) => {
      if (!store) {
        return res.status(404).json({ message: 'Store not found' });
      }
      if (req.body.store_name) {
        store.store_name = req.body.store_name;
      }
      if (req.body.phone) {
        store.phone = req.body.phone;
      }
      if (req.body.email) {
        store.email = req.body.email;
      }
      if (req.body.logo) {
        store.logo = req.body.logo;
      }

      // Update store sub categories
      if (req.body.sub_categories) {
        const subCategoryIds = req.body.sub_categories.split(',');
        const subCategories = await SubCategory.find({
          _id: { $in: subCategoryIds },
        }).exec();
        store.sub_categories = subCategories.map(
          (subCategory) => subCategory._id
        );
      }

      // Update store vouchers
      if (req.body.vouchers) {
        const voucherIds = req.body.vouchers.split(',');
        const vouchers = await Voucher.find({
          _id: { $in: voucherIds },
        }).exec();
        store.vouchers = vouchers.map((voucher) => voucher._id);
      }

      // Update store location
      if (req.body.locations) {
        const locationDetails = await getLocationAdrs(
          req.body.locations.coordinates
        );

        const location = new Location({
          type: 'Point',
          coordinates: locationDetails.coordinates,
          formattedAddress: locationDetails.formattedAddress,
          city: locationDetails.city,
          country: locationDetails.country,
          store: store._id,
        });

        const savedLocation = await location.save();
        store.locations.push(savedLocation._id);
      }

      store
        .save()
        .then((updatedStore) => {
          res.status(200).json({
            message: 'Store updated successfully',
            store: updatedStore,
          });
        })
        .catch((error) => {
          res.status(500).json({ error });
        });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

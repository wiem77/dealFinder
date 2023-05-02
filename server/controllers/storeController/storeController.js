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
  console.log(req.body);
  const { email, store_name, sub_categories, coordinates, phone, webSite } =
    req.body;
  console.log(req.body);
  console.log(req.file);
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
      store: Store._id,
    });

    const savedLocation = await location.save();

    const store = new Store({
      store_name: store_name,
      phone: phone,
      email: email,
      webSite: webSite,
      locations: [savedLocation._id],
      sub_categories: [],
      vouchers: [],
    });

    console.log(sub_categories);
    if (!req.body.sub_categories) {
      return res.status(400).send({ message: 'sub_categories is required' });
    }
    for (const subCategoryId of sub_categories) {
      const subCategory = await SubCategory.findById(subCategoryId);
      if (subCategory) {
        store.sub_categories.push(subCategory._id);
        subCategory.stores.push(store._id);
        await subCategory.save();
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

exports.getAllStores = (req, res) => {
  Store.find({})
    .populate('locations')
    .populate('sub_categories')
    .then((stores) => {
      res.status(200).json(stores);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: 'Error getting all stores.' });
    });
};

exports.getAllStoresWithLocations = (req, res) => {
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
exports.deleteStore = (req, res) => {
  const { id } = req.params;

  Store.findById(id)
    .populate('vouchers')
    .then((store) => {
      if (!store) {
        return res.status(404).json({ message: 'Store not found' });
      }
      return store
        .deleteOne()
        .then(() => {
          if (store.vouchers.length > 0) {
            store.vouchers.forEach((voucher) => voucher.delete());
          }
          res.status(200).json({ message: 'Store deleted successfully' });
        })
        .catch((err) => {
          res
            .status(500)
            .json({ message: 'Failed to delete store', error: err });
        });
    })
    .catch((err) => {
      res.status(500).json({ message: 'Failed to delete store', error: err });
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

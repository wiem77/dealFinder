const Category = require('../../models/CategoryModel');
const Voucher = require('../../models/VoucherModel');
const Location = require('../../models/LocationModel');
const Store = require('../../models/StoreModel');
const SubCategory = require('../../models/subCategoryModel');
const Media = require('../../models/MediaModel');
const { storeValidation } = require('../../utils/ValidationSchema');

const sendEmail = require('../../utils/generatEmailValidation');

const generateStoreToken = require('../../utils/generateStoreToken');
const StoreToken = require('../../models/StoreToken');
const getLocationAdrs = require('../../utils/generateAdresse').getLocationAdrs;
exports.addStore = async (req, res, next) => {
  console.log('add2...');
  console.log(req.body);
  const { email, StoreName, subCategories, phone, webSite, description } =
    req.body;
  const lat = parseFloat(req.body.laltitude);
  const long = parseFloat(req.body.longitude);
  const coordinates = [lat, long];
  console.log('coordinates', coordinates);
  console.log(subCategories);

  // console.log(req.file);
  const store_image = req.file;
  console.log(req.file);
  try {
    const existingStore = await Store.findOne({
      store_name: StoreName,
      email: email,
    });
    if (existingStore) {
      throw new Error('A store with the same name and email already exists');
    }
    if (!store_image) {
      throw new Error('Logo required');
    }
    const fileName = req.file.filename;

    const media = new Media({
      path: `${req.protocol}://${req.headers.host}/public/image/${fileName}`,
      extension: fileName.split('.').pop(),
    });

    await media.save();
    const locationDetails = await getLocationAdrs(coordinates);
    console.log('coordinates', locationDetails);
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
    console.log(subCategories);
    if (!req.body.subCategories) {
      return res.status(400).send({ message: 'sub_categories is required' });
    }

    const store = new Store({
      store_name: StoreName,
      phone: phone,
      email: email,
      webSite: webSite,
      description: description,
      locations: [savedLocation._id],
      subCategories: [subCategories],
      vouchers: [],
      store_image: [media._id],
    });
    for (const subCategoryId of subCategories) {
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
    console.error(error);

    console.error(error);
    res.status(400).send({ message: error.message });
  }
  // next(error);
};

exports.deleteLocationForStore = async (req, res, next) => {
  const { storeId, locationId } = req.params;

  try {
    const store = await Store.findByIdAndUpdate(storeId, {
      $pull: { locations: locationId },
    });

    if (!store) {
      return res.status(404).json({ success: false, error: 'Store not found' });
    }

    const location = await Location.findOneAndDelete({ _id: locationId });

    if (!location) {
      return res
        .status(404)
        .json({ success: false, error: 'Location not found' });
    }

    res.status(200).json({ success: true, data: location });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};
exports.getAllStores = async (req, res) => {
  console.log('get All');
  try {
    const stores = await Store.find({})
      .populate('locations', 'formattedAddress city zipcode coordinates')
      .populate({
        path: 'sub_categories',
        populate: {
          path: 'category',
          select: 'category_name',
        },
        select: 'subCategory_name category',
      })
      .populate('vouchers')
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
  console.log(req.body);
  const lat = req.body.laltitude;
  const long = req.body.longitude;
  const coordinates = [lat, long];
  console.log('coordinates', coordinates);
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

      if (req.body.sub_categories) {
        console.log('test');
        const subCategoryIds = req.body.sub_categories;
        const subCategories = await SubCategory.find({
          _id: { $in: subCategoryIds },
        });

        store.sub_categories = subCategories.map(
          (subCategory) => subCategory._id
        );

        console.log('test2', store.sub_categories);
      }

      if (req.body.vouchers) {
        const voucherIds = req.body.vouchers.split(',');
        const vouchers = await Voucher.find({
          _id: { $in: voucherIds },
        }).exec();
        store.vouchers = vouchers.map((voucher) => voucher._id);
      }
      if (coordinates) {
        const locationDetails = await getLocationAdrs(coordinates);

        const location = new Location({
          type: 'Point',
          coordinates: locationDetails.coordinates,
          formattedAddress: locationDetails.formattedAddress,
          city: locationDetails.city,
          country: locationDetails.country,
          store: store._id,
        });

        const savedLocation = await location.save();
        console.log(savedLocation);
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
exports.loginStore = async (req, res) => {
  console.log('Entering  store login  function...');
  console.log(req.body);
  try {
    console.log('Looking up store...');
    const store = await Store.findOne({ accesscode: req.body.accesscode });
    if (!store) {
      console.log(store);
      return res.status(400).send({ message: "Code d'acces invalide " });
    }
    const { accessToken, refreshToken } = await generateStoreToken(store);
    console.log('Login successful');
    console.log(accessToken, refreshToken, store);

    return res.status(200).send({
      accessToken,
      refreshToken,
      message: 'Logged in successfully as user',
      store,
    });
  } catch (error) {
    console.error('Server error:', error.message);
    return res.status(500).send({
      message: 'Une erreur est survenue, veuillez réessayer à nouveau ',
    });
  }
};
module.exports.logout = async (req, res) => {
  try {
    const refreshToken = req.header('x-refresh-token');
    const storeId = req.user._id;
    await StoreToken.deleteOne({ storeId, token: refreshToken });
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    res.status(500).json({ error: true, message: 'Internal server error' });
  }
};

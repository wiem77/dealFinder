const Category = require('../../models/CategoryModel');
const Voucher = require('../../models/VoucherModel');
const Location = require('../../models/LocationModel');
const Store = require('../../models/StoreModel');

const { storeValidation } = require('../../utils/ValidationSchema');
const { geocodeAddress } = require('../../utils/geocoder');
const generateOTP = require('../../utils/generateOTP');
const sendEmail = require('../../utils/generatEmailValidation');
const getLocationAdrs = require('../../utils/generateAdresse').getLocationAdrs;

exports.addStore = async (req, res, next) => {
  console.log('latitude :', req.body.coordinates[1]);
  console.log('lon :', req.body.coordinates[0]);

  // const { error } = storeValidation(req.body);

  // if (error) {
  //   return res.status(400).send({ message: error.details[0].message });
  // }

  try {
    const existingStore = await Store.findOne({
      store_name: req.body.store_name,
      email: req.body.email,
    });
    if (existingStore) {
      throw new Error('A store with the same name and email already exists');
    }
    const locationDetails = await getLocationAdrs(req.body.coordinates);

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
      store_name: req.body.store_name,
      phone: req.body.phone,
      email: req.body.email,
      locations: [savedLocation._id],
      vouchers: [],
    });

    const savedStore = await store.save();
    const populatedStore = await Store.findById(savedStore._id).populate(
      'locations'
    );

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
    .populate('address')
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
    .populate('address')
    .populate('categories')
    .populate('vouchers')
    .exec()
    .then((store) => {
      if (!store) {
        return res.status(404).json({ message: 'Store not found' });
      }

      // Update store fields
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

      // Update store categories
      if (req.body.categories) {
        store.categories = req.body.categories;
      }

      // Update store vouchers
      if (req.body.vouchers) {
        store.vouchers = req.body.vouchers;
      }

      // Update store location
      if (req.body.address) {
        const newAddress = new Location({
          longitude: req.body.address.longitude,
          latitude: req.body.address.latitude,
        });
        newAddress
          .save()
          .then((savedAddress) => {
            store.address = savedAddress;
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
      } else {
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
      }
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

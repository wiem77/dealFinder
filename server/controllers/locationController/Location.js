const Location = require('../../models/LocationModel');

// exports.addLocation = async (req, res, next) => {
//   const { address } = req.body;
//   try {
//
//     const response = await geocoder.getGeolocation(req, res, next);
//     const locationData = {
//       address,
//       location: {
//         type: 'Point',
//         coordinates: response.data.location.coordinates,
//         formattedAddress: response.data.location.formattedAddress,
//       },
//     };

//     // Create a new location document using the Location model
//     const location = await Location.create(locationData);
//     res.status(201).json({
//       success: true,
//       data: location,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

exports.createLocation = async (req, res, next) => {
  const { type, coordinates, formattedAddress, city, country } = req.body;
  console.log(req.body);
  const location = new Location({
    type,
    coordinates,
    formattedAddress,
    city,
    country,
  });
  console.log('loactiontest', location);
  try {
    await location.save();
    res.status(201).json(location);
  } catch (err) {
    next(err);
  }
};

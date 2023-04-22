const Location = require('../../models/LocationModel');


exports.addLocation = async (req, res, next) => {
  const { address } = req.body;
  try {
    // Get geolocation data from address using the geocoder utility
    const response = await geocoder.getGeolocation(req, res, next);
    const locationData = {
      address,
      location: {
        type: 'Point',
        coordinates: response.data.location.coordinates,
        formattedAddress: response.data.location.formattedAddress,
      },
    };

    // Create a new location document using the Location model
    const location = await Location.create(locationData);
    res.status(201).json({
      success: true,
      data: location,
    });
  } catch (error) {
    next(error);
  }
};

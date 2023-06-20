const NodeGeocoder = require('node-geocoder');
const geocoder = NodeGeocoder({
  provider: 'opencage',
  apiKey: '2baa0538dc3f41839745c63827d05f40',
});
const Location = require('../../models/LocationModel');
exports.addLocation = async (req, res) => {
  try {
    const result = await geocoder.reverse({
      lat: req.body.coordinates[1],
      lon: req.body.coordinates[0],
      no_annotations: 1,
    });
    const lat = result[0]?.latitude;
    const lon = result[0]?.longitude;
    const city = result[0]?.city;
    const streetName = result[0]?.streetName;
    const country = result[0]?.country;
    const zipcode = result[0]?.zipcode;
    const streetNumber = result[0]?.streetNumber;
    const state = result[0]?.state;
    const formattedAddress = `${streetName},${streetNumber},${state},${zipcode},${city},${country}`;
    const location = new Location({
      type: 'Point',
      coordinates: [lon, lat],
      formattedAddress,
      city,
      country,
    });
    await location.save();
    res.status(201).json({
      success: true,
      data: location,
    });
  } catch (error) {
    console.error(error.message);

    res.status(500).json({
      success: false,
      error: 'Failed to add location',
    });
  }
};

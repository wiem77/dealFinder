const { geocoder } = require('../config/geocoderConfig');
module.exports.getLocationAdrs = async (coordinates) => {
  try {
    const result = await geocoder.reverse({
      lat: coordinates[0],
      lon: coordinates[1],
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
    const formattedAddress = `${streetName},${streetNumber},${state},${city}`;

    return {
      coordinates: [lon, lat],
      formattedAddress,
      city,
      country,
      zipcode,
    };
  } catch (error) {
    console.error(error.message);
    throw new Error('Failed to get location details');
  }
};

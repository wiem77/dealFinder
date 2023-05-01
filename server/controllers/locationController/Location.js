const NodeGeocoder = require('node-geocoder');


const OPEN_CAGE_KEY = '2baa0538dc3f41839745c63827d05f40';
const geocoder = NodeGeocoder({
  provider: 'opencage',
  apiKey: '2baa0538dc3f41839745c63827d05f40',
});
const Location = require('../../models/LocationModel');

exports.addLocation = async (req, res) => {
  console.log('req.body', req.body);
  console.log('req.body.coordinates', req.body.coordinates);

  console.log('latitude :', req.body.coordinates[1]);
  console.log('lon :', req.body.coordinates[0]);
  // if (typeof latitude !== 'number' || typeof longitude !== 'number') {
  //   throw new Error('Invalid latitude or longitude');
  // }

  try {
    const result = await geocoder.reverse({
      lat: req.body.coordinates[1],
      lon: req.body.coordinates[0],
      no_annotations: 1,
    });

    console.log('result', result);

    const lat = result[0]?.latitude;
    const lon = result[0]?.longitude;
    const city = result[0]?.city;
    const streetName = result[0]?.streetName;
    const country = result[0]?.country;
    const zipcode = result[0]?.zipcode;
    const streetNumber = result[0]?.streetNumber;
    const state = result[0]?.state;
    const formattedAddress = `${streetName},${streetNumber},${state},${zipcode},${city},${country}`;
    console.log('res', result[0]);

    const location = new Location({
      type: 'Point',
      coordinates: [lon, lat],
      formattedAddress,
      city,
      country,
    });

    console.log('test');
    await location.save();
    console.log('test2', location);
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

// const NodeGeocoder = require('node-geocoder');
// const Location = require('../../models/LocationModel');

// const MAPBOX8_KEY =
//   'pk.eyJ1Ijoid2llbTc4IiwiYSI6ImNsZ3M2ZWxlODBjMnQzbm9jdms5cWljZnIifQ.f095ojlTlG6RpbJWZkoo4g';
// const geocoder = NodeGeocoder({
//   apiKey: MAPBOX8_KEY,
//   provider: 'mapbox',
// });

// exports.addLocation = async (req, res) => {
//   const { latitude, longitude } = req.body;
//   console.log('1 log req.body', req.body);
//   try {
//     const result = await geocoder.reverse({
//       lat: latitude,
//       lon: longitude,
//       types: ['address', 'poi', 'neighborhood'],
//     });

//     console.log('result', result);
//     const formattedAddress = result[0].formattedAddress;
//     const lat = result[0].latitude;
//     const lon = result[0].longitude;
//     const city = result[0].city;

//     const country = result[0].country;
//     console.log('res', result[0]);

//     const location = new Location({
//       type: 'Point',
//       coordinates: [lon, lat],
//       formattedAddress,
//       city,
//       country,
//     });
//     console.log('test');
//     // await location.save();
//     console.log('test2', location);
//     res.status(201).json({
//       success: true,
//       data: location,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       error: 'Failed to add location',
//     });
//   }
// };
//2baa0538dc3f41839745c63827d05f40

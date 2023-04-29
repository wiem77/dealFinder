const fetch = require('node-fetch');
// async function geocodeAddress(address) {
//   const url = `https://geocode.xyz/${encodeURIComponent(address)}?json=1`;
//   const response = await fetch(url);
//   const json = await response.json();
//   console.log('Geocoding response:', json);
//   if (!json || json.error || !json.latt || !json.longt) {
//     throw new Error(`Unable to geocode address: ${address}`);
//   }
//   return {
//     type: 'Point',
//     coordinates: [parseFloat(json.longt), parseFloat(json.latt)],
//     formattedAddress: json.standard.city,
//   };
// }

async function geocodeAddress(address) {
  console.log('Geocoding address:', address);
  const url = `https://nominatim.openstreetmap.org/search/${encodeURIComponent(
    address
  )}?format=json`;
  console.log('Geocoding URL:', url);
  const response = await fetch(url);
  
  const json = await response.json();
  // console.log('Geocoding response:', json);
  if (!json || !json.length || !json[0].lat || !json[0].lon) {
    throw new Error(`Unable to geocode address: ${address}`);
  }
  return {
    type: 'Point',
    coordinates: [parseFloat(json[0].lon), parseFloat(json[0].lat)],
    formattedAddress: json[0].display_name,
  };
}

module.exports = { geocodeAddress };

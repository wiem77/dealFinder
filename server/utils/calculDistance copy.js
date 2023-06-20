module.exports.toRadians = (degrees) => {
  return degrees * (Math.PI / 180);
};

module.exports.calculateDistance = async (lat1, lon1, lat2, lon2) => {
  const R = 6371;
  const lat1Rad = module.exports.toRadians(lat1);
  const lon1Rad = module.exports.toRadians(lon1);
  const lat2Rad = module.exports.toRadians(lat2);
  const lon2Rad = module.exports.toRadians(lon2);

  const deltaLat = lat2Rad - lat1Rad;
  const deltaLon = lon2Rad - lon1Rad;

  const a =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(lat1Rad) *
      Math.cos(lat2Rad) *
      Math.sin(deltaLon / 2) *
      Math.sin(deltaLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c;
  return distance;
};

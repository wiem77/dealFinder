const jwt = require('jsonwebtoken');
const StoreToken = require('../models/StoreToken');

const generateStoreToken = async (store) => {
  try {
    const payload = { _id: store };
    const accessToken = jwt.sign(
      payload,
      process.env.ACCESS_TOKEN_PRIVATE_KEY,
      { expiresIn: '14m' }
    );
    const refreshToken = jwt.sign(
      payload,
      process.env.REFRESH_TOKEN_PRIVATE_KEY,
      { expiresIn: '30d' }
    );
    await StoreToken.deleteOne({ storeId: store._id });
    await new StoreToken({ storeId: store._id, token: refreshToken }).save();

    return Promise.resolve({ accessToken, refreshToken });
  } catch (error) {
    return Promise.reject(error);
  }
};

module.exports = generateStoreToken;

const jwt = require('jsonwebtoken');
const UserToken = require('../models/UserToken');

const generateAuthToken = async (user) => {
  try {
    const payload = { _id: user._id, roles: user.roles };
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
    await UserToken.deleteOne({ userId: user._id });
    await new UserToken({ userId: user._id, token: refreshToken }).save();

    return Promise.resolve({ accessToken, refreshToken });
  } catch (error) {
    return Promise.reject(error);
  }
};

module.exports = generateAuthToken;

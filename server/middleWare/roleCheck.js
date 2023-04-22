const User = require('../models/User')

exports.roleCheck = (req, res, next) => {
  if (req.user.roles === 'admin') {
    next();
  } else {
    res.status(403).json({ error: true, message: 'You are not authorized' });
  }
};


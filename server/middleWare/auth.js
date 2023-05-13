const jwt = require('jsonwebtoken');

exports.auth = async (req, res, next) => {
  console.log('testttt');
  const token = req.header('x-access-token');
  console.log(token);
  if (!token)
    return res
      .status(403)
      .json({ error: true, message: 'Accès refusé : aucun jeton fourni' });
  try {
    const tokenDetails = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_PRIVATE_KEY
    );
    req.user = tokenDetails;
    next();
  } catch (error) {
    res.status(403).json({ error: true, message: ' Accès refusé' });
  }
};

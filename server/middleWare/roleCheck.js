exports.roleCheck = (req, res, next) => {
  console.log('Checking user role...');

  
  const userRole = req.body.userRole; 
  console.log(req.body.userRole);
  if (userRole === 'admin') {
    console.log('User is an admin');
    next();
  } else {
    console.log('User is not an admin');
    return res.status(403).json({ error: true, message: 'Forbidden' });
  }
};

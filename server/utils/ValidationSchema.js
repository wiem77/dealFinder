const joi = require('joi');
const passwordComplexity = require('joi-password-complexity');
const signUpValidation = (body) => {
  const schema = joi.object({
    nom: joi.string().required().label('nom'),
    prenom: joi.string().required().label('prenom'),
    telephone: joi.string().required().label('telephone'),
    sexe: joi.string().required().label('sexe'),
    email: joi.string().required().label('email'),
    password: passwordComplexity().required().label('password'),
    confirmpassword: joi.ref('password'),
    age: joi.required(),
    roles: joi.array().items(joi.string()).label('roles'),
  });
  return schema.validate(body);
};
const createnewAdminValidation = (body) => {
  const schema = joi.object({
    nom: joi.string().required().label('nom'),
    prenom: joi.string().required().label('prenom'),
    telephone: joi.string().required().label('telephone'),
    sexe: joi.string().required().label('sexe'),
    email: joi.string().required().label('email'),
    password: passwordComplexity().required().label('password'),
    confirmpassword: joi.ref('password'),
    age: joi.required(),
    roles: joi.string().required().label('roles'),
  });
  return schema.validate(body);
};
const storeValidation = (body) => {
  const schema = joi.object({
    store_name: joi.string().required().label('Store Name'),
    phone: joi.string().min(8).max(20).required().label('phone'),
    email: joi.string().email().required().label('Email'),
    address: joi.required().label('Locations'),
    vouchers: joi.array().items(joi.string()).label('Vouchers'),
    rating: joi.number().min(0).max(5).label('Rating'),
  });
  return schema.validate(body);
};

const loginValidate = (body) => {
  const schema = joi.object({
    // email: joi.string().required().label('email'),
    telephone: joi.string().required().label('telephone'),
    password: joi.string().required().label('password'),
  });
  return schema.validate(body);
};
const refreshToken = (body) => {
  const schema = joi.object({
    refreshToken: joi.string().required().label('RefreshToken'),
  });
  return schema.validate(body);
};
// const validateLocations = async (req, res, next) => {
//   try {
//     const locations = req.body.locations;
//     if (locations && locations.length) {
//       const locationPromises = locations.map(async (location) => {
//         if (!location.address) {
//           throw new Error("Location address is required");
//         }
//       });
//       await Promise.all(locationPromises);
//       next();
//     } else {
//       throw new Error("At least one location is required");
//     }
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };
module.exports = {
  signUpValidation,
  loginValidate,
  refreshToken,
  storeValidation,
  createnewAdminValidation,
};

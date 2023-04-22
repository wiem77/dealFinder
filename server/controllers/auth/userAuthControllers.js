const bcrypt = require('bcrypt');

const User = require('../../models/User');
const Location = require('../../models/LocationModel');
const Otp = require('../../models/OtpVerification');

const { geocodeAddress } = require('../../utils/geocoder');

const sendEmail = require('../../utils/generatEmailValidation');
const generateOTP = require('../../utils/generateOTP');
const {
  signUpValidation,
  loginValidate,
} = require('../../utils/ValidationSchema');
const generateAuthToken = require('../../utils/generateToken');

module.exports.register = async (req, res) => {
  console.log('Register..');
  const addresse = req.body?.address;
  try {
    console.log('Register function called');
    const { error } = signUpValidation(req.body);
    // if (error) {
    //   return res.status(400).send({ message: error.details[0].message });
    // }

    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return res
        .status(409)
        .send({ message: 'user with given email already exists' });
    }

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPwd = await bcrypt.hash(req.body.password, salt);
    const confirmhashPwd = await bcrypt.hash(req.body.confirmpassword, salt);
    const location = await geocodeAddress(addresse);
    const newLocation = new Location({
      address: addresse,
      location: {
        type: 'Point',
        coordinates: location.coordinates,
        formattedAddress: location.formattedAddress,
      },
      user: User._id,
    });
    const savedLocation = await newLocation.save();
    const newUser = new User({
      ...req.body,
      password: hashPwd,
      confirmpassword: confirmhashPwd,
      verified: false,
      locations: [savedLocation._id],
    });

    await newUser.save();
    console.log('Register  find ', newUser);
    const otpNumber = await generateOTP();
    console.log('otpNumber', otpNumber);
    const otpVerification = new Otp({
      email: req.body.email,
      userId: newUser._id,
      otp: otpNumber,
      createdAt: Date.now(),
      expiredAt: Date.now() + 24 * 60 * 60 * 1000,
    });
    console.log('test1', otpVerification);
    await otpVerification.save();
    console.log('test', otpVerification);
    const emailText = `Bonjour ${newUser.prenom},${newUser.nom},\n\nMerci de vous être enregistré sur notre application. Veuillez saisir ce code \x1b${otpNumber}\x1b dans le champ pour vérifier votre adresse e-mail:\n\nCordialement,\nL'équipe de l'application`;
    console.log('emailText', emailText);
    try {
      await sendEmail(
        newUser.email,
        'Veuillez vérifier votre adresse e-mail',
        emailText
      );
      res.status(201).send({
        message:
          'user created successfully, a verification email has been sent to your email address',
      });
    } catch (error) {
      await newUser.delete();
      await otpVerification.delete();
      res.status(500).send({
        message: 'error sending verification email, please try again later',
        error,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'server error', error });
  }
};

module.exports.getUserIdByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    return res.send({ userId: user._id });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'server error', error });
  }
};




module.exports.login = async (req, res) => {
  console.log('Entering login function...');
  try {
    const { error } = loginValidate(req.body);
    if (error) {
      console.log('Validation error:', error.details[0].message);
      return res.status(400).send({ message: error.details[0].message });
    }

    console.log('Looking up user...');
    const user = await User.findOne({ telephone: req.body.telephone });
    if (!user) {
      return res.status(400).json({ msg: 'User does not exist. ' });
    }

    console.log('Comparing passwords...');
    const validPwd = await bcrypt.compare(req.body.password, user.password);
    if (!validPwd) {
      console.log('Invalid password');
      return res.status(400).send({ message: 'Invalid telephone or password' });
    }

    const { accessToken, refreshToken } = await generateAuthToken(user);
    console.log('Login successful');
    return res.status(200).send({
      accessToken,
      refreshToken,
      message: 'Logged in successfully',
    });
  } catch (error) {
    console.error('Server error:', error.message);
    return res.status(500).send({ message: 'Server error' });
  }
};

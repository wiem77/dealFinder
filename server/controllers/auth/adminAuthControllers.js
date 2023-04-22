const bcrypt = require('bcrypt');

const User = require('../../models/User');
const Otp = require('../../models/OtpVerification');

const { createnewAdminValidation } = require('../../utils/ValidationSchema');
const generateAuthToken = require('../../utils/generateToken');
const generateOTP = require('../../utils/generateOTP');
const sendEmail = require('../../utils/generatEmailValidation');

module.exports.register = async (req, res) => {
  console.log('Register..');
  try {
    console.log('Register function called');
    const { error } = await createnewAdminValidation(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return res
        .status(409)
        .send({ message: 'user with given email already exists' });
    }

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPwd = await bcrypt.hash(req.body.password, salt);
    const confirmhashPwd = await bcrypt.hash(req.body.confirmpassword, salt);

    const newUser = new User({
      ...req.body,
      password: hashPwd,
      confirmpassword: confirmhashPwd,
      verified: false,
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
    const emailText = `Bonjour ${newUser.prenom},${newUser.nom},\n\nMerci de vous être enregistré sur notre application. Veuillez saisir ce code ${otpNumber} dans le champ pour vérifier votre adresse e-mail:\n\nCordialement,\nL'équipe de l'application`;

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
      await newUser.deleteOne();
      await otpVerification.deleteOne();
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
module.exports.signIn = async (req, res) => {
  console.log('Entering login function...');
  console.log(req.body);
  try {
    console.log('Looking up user...');
    const user = await User.findOne({ email: req.body.email });
    console.log('test');
    if (!user) {
      console.log(user);
      return res.status(400).send({ message: 'Invalid email or password' });
    }

    console.log('Comparing passwords...');
    const validPwd = await bcrypt.compare(req.body.password, user.password);
    if (!validPwd) {
      console.log('Invalid password');
      return res.status(400).send({ message: 'Invalid telephone or password' });
    }

    const { accessToken, refreshToken } = await generateAuthToken(user);
    console.log('Login successful');

    if (user.roles === 'admin') {
      console.log('admin succ ', user.roles);
      return res.status(200).send({
        accessToken,
        refreshToken,
        message: 'Logged in successfully as admin',
        role: user.roles,
      });
    } else {
      return res.status(200).send({
        accessToken,
        refreshToken,
        message: 'Logged in successfully as user',
        role: user.roles,
      });
    }
  } catch (error) {
    console.error('Server error:', error.message);
    return res.status(500).send({ message: 'Server error' });
  }
};
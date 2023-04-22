const bcrypt = require('bcrypt');

const User = require('../../models/User');
const Otp = require('../../models/OtpVerification');

const { createnewAdminValidation } = require('../../utils/ValidationSchema');
const generateAuthToken = require('../../utils/generateToken');
const generateOTP = require('../../utils/generateOTP');
const sendEmail = require('../../utils/generatEmailValidation');
module.exports.signUp = async (req, res) => {
  console.log('Register..');

  try {
    console.log('Register function called');
    // const { error } = signUpValidation(req.body);
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

    const newUser = new User({
      ...req.body,
      password: hashPwd,
      confirmpassword: confirmhashPwd,
      verified: false,
    });

    if (req.body.roles) {
      newUser.roles = req.body.roles;
    } else {
      newUser.roles = 'consommateur';
    }

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

    await otpVerification.save();
    console.log('test', otpVerification);
    const emailText = `Bonjour ${newUser.prenom} ${newUser.nom},
    Nous vous remercions de vous être inscrit à notre application. Afin de vérifier votre adresse e-mail, veuillez entrer le code de vérification suivant : \x1b${otpNumber}\x1b
    Si vous avez des questions ou des préoccupations, n'hésitez pas à nous contacter. Nous sommes là pour vous aider.
    Cordialement,
    L'équipe de l'application.`;
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
      return res.status(400).send({ message: 'Invalid  password' });
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

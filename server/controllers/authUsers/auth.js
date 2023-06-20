const bcrypt = require('bcrypt');

const Otp = require('../../models/OtpVerification');

const { createnewAdminValidation } = require('../../utils/ValidationSchema');
const generateAuthToken = require('../../utils/generateToken');
const generateOTP = require('../../utils/generateOTP');
const sendEmail = require('../../utils/generatEmailValidation');
const User = require('../../models/User');
const Location = require('../../models/LocationModel');

const Media = require('../../models/MediaModel');
module.exports.signUp = async (req, res) => {
  const data = JSON.parse(req.body.userData);
  const {
    nom,
    prenom,
    telephone,
    email,
    password,
    confirmpassword,
    age,
    sexe,
    roles,
    coordinates,
    formattedAddress,
    type,
    city,
    country,
  } = data;
  console.log('Register..');

  try {
    console.log('Register function called');
    const user = await User.findOne({ email: email });
    if (user) {
      return res
        .status(409)
        .send({ message: 'user with given email already exists' });
    }
    const confirmpass = confirmpassword;
    console.log(confirmpass);
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPwd = await bcrypt.hash(password, salt);
    const confirmhashPwd = await bcrypt.hash(confirmpassword, salt);

    let picturePath;
    if (req.file) {
      const fileName = req.file.filename;
      console.log(`http://localhost:4000/public/image/${fileName}`);
      const media = new Media({
        path: `http://localhost:4000/public/image/${fileName}`,

        extension: fileName.split('.').pop(),
      });
      await media.save();
      picturePath = [media._id];
      console.log('media', media);
    } else {
      picturePath;
    }

    const location = new Location({
      type: type,
      coordinates: coordinates,
      formattedAddress: formattedAddress,
      city: city,
      country: country,
    });
    await location.save();
    console.log(location, 'location');

    const newUser = new User({
      nom: nom,
      prenom: prenom,
      email: email,
      telephone: telephone,
      password: hashPwd,
      confirmpassword: confirmhashPwd,
      sexe: sexe,
      age: age,
      roles: roles,

      verified: false,
      picturePath: picturePath,
      location: location._id,
    });

    await newUser.save();
    console.log('Register  find ', newUser);
    const otpNumber = await generateOTP();
    console.log('otpNumber', otpNumber);
    const otpVerification = new Otp({
      email: email,
      userId: newUser._id,
      otp: otpNumber,
      createdAt: Date.now(),
      expiredAt: Date.now() + 24 * 60 * 60 * 1000,
    });

    await otpVerification.save();
    console.log('test', otpVerification);
    const emailText = `Bonjour ${newUser.prenom} ${newUser.nom},

Nous vous remercions de vous être inscrit à notre application. Afin de vérifier votre adresse e-mail, veuillez entrer le code de vérification suivant : ${otpNumber}

Si vous avez des questions ou des préoccupations, n'hésitez pas à nous contacter. Nous sommes là pour vous aider.

Cordialement,
DealFinder`;

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
    const user = await User.findOne({ email: req.body.email })
      .populate('location')
      .populate({
        path: 'favorite_stores',
        select: '_id store_name',
      })
      .populate({
        path: 'reservedVouchers',
        select: 'qrCode expiry archived used',
        populate: {
          path: 'voucher',
          select: 'name_V discount is_available store',
          populate: { path: 'store', select: 'store_name' },
        },
      })
      .populate({
        path: 'archivedVouchers',
        select: 'qrCode expiry archived used',
        populate: {
          path: 'voucher',
          select: 'name_V discount is_available',
        },
      })
      .populate({
        path: 'picturePath',
        select: '_id path',
      });

    if (!user) {
      console.log(user);
      return res.status(400).send({ message: 'Invalid email or password' });
    }
    console.log('req.body.password', req.body.password);
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
        role: 'admin',
        user: {
          _id: user._id,
          name: user.nom,
          prenom: user.prenom,
          email: user.email,
          password: user.password,
          roles: user.roles,
        },
      });
    } else {
      return res.status(200).send({
        accessToken,
        refreshToken,
        message: 'Logged in successfully as user',
        user: user,
        role: user.roles,
      });
    }
  } catch (error) {
    console.error('Server error:', error.message);
    return res.status(500).send({ message: 'Server error' });
  }
};
module.exports.signInAdmin = async (req, res) => {
  console.log('Entering login function...');
  console.log(req.body);
  try {
    console.log('Looking up user...');
    const user = await User.findOne({ email: req.body.email }).populate({
      path: 'picturePath',
      select: '_id path',
    });

    if (!user) {
      console.log(user);
      return res
        .status(400)
        .send({ message: 'Mot de passe ou email invalide' });
    }

    console.log('Comparing passwords...');
    const validPwd = await bcrypt.compare(req.body.password, user.password);
    if (!validPwd) {
      return res.status(400).send({ message: 'Mot de passe invalide' });
    }

    if (user.roles[0] === 'admin') {
      const { accessToken, refreshToken } = await generateAuthToken(user);
      return res.status(200).send({
        accessToken,
        refreshToken,
        message: "Connecté en tant qu'administrateur",
        role: 'admin',
        user: {
          _id: user._id,
          name: user.nom,
          prenom: user.prenom,
          email: user.email,
          password: user.password,
          roles: user.roles,
        },
      });
    } else {
      return res.status(401).send({ message: "Vous n'êtes pas autorisé" });
    }
  } catch (error) {
    console.error('Erreur du serveur:', error.message);
    return res.status(500).send({ message: 'Erreur du serveur' });
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

module.exports.test = async (req, res) => {
  try {
    console.log('hani jyt');
  } catch (error) {
    console.log(error);
  }
};
module.exports.getUsers = async (req, res) => {
  try {
    const users = await User.find()
      .populate('location', 'city zipcode')
      .select('-password -confirmpassword -cart -favorite_stores');
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
module.exports.updateUserPassword = async (req, res) => {
  const { newPassword, confirmPassword } = req.body;

  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    console.log(newPassword, confirmPassword);
    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        message:
          'Le nouveau mot de passe et la confirmation ne correspondent pas',
      });
    }
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPwd = await bcrypt.hash(newPassword, salt);
    const confirmhashPwd = await bcrypt.hash(confirmPassword, salt);
    user.password = hashPwd;
    user.confirmpassword = confirmhashPwd;
    await user.save();

    return res
      .status(200)
      .json({ message: 'Mot de passe mis à jour avec succès' });
  } catch (error) {
    console.error('Erreur lors de la mise à jour du mot de passe', error);
    return res.status(500).json({
      message: 'Une erreur est survenue lors de la mise à jour du mot de passe',
    });
  }
};
module.exports.updateUser = async (req, res) => {
  const { userId } = req.params;
  const { email, telephone } = req.body;
  console.log(email, telephone);
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    if (email && email !== user.email) {
      user.email = email;
    }
    if (telephone && telephone !== user.telephone) {
      user.telephone = telephone;
    }
    await user.save();
    res
      .status(200)
      .json({ message: 'Utilisateur mis à jour avec succès', user });
  } catch (error) {
    res.status(500).json({
      message:
        "Une erreur est survenue lors de la mise à jour de l'utilisateur",
    });
  }
};

const User = require('../../models/User');
const Otp = require('../../models/OtpVerification');
const sendEmail = require('../../utils/generatEmailValidation');

const generateOTP = require('../../utils/generateOTP');
module.exports.verifyEmailWithOTP = async (req, res) => {
  try {
    const { id } = req.params;
    const otp = req.body.otp;
    console.log('id:', id);
    console.log('otp:', otp);

    const otpVerification = await Otp.findOne({
      userId: id,
      otp: otp,
      expiredAt: { $gt: Date.now() },
    });
    console.log('otpVerification:', otpVerification);

    if (!otpVerification) {
      return res.status(404).send({ message: 'Invalid OTP' });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    if (user.verified) {
      await Otp.deleteOne({ _id: otpVerification._id });
      return res.status(400).send({ message: 'Email already verified' });
    }

    await User.findByIdAndUpdate(id, { verified: true });
    await Otp.deleteOne({ _id: otpVerification._id });

    return res.send({ message: 'Email verification successful' });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'server error', error });
  }
};

module.exports.resendVerificationEmail = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    if (user.verified) {
      return res.status(400).send({ message: 'User is already verified' });
    }

    await Otp.deleteMany({ email });

    const otpNumber = await generateOTP();

    const otpVerification = new Otp({
      email,
      userId: user._id,
      otp: otpNumber,
      createdAt: Date.now(),
      expiredAt: Date.now() + 24 * 60 * 60 * 1000,
    });

    await otpVerification.save();

    const emailText = `Bonjour ${user.prenom},${user.nom},\n\nMerci de vous être enregistré sur notre application. Veuillez saisir ce code ${otpNumber} dans le champ pour vérifier votre adresse e-mail:\n\nCordialement,\nL'équipe de l'application`;

    await sendEmail(email, 'Veuillez vérifier votre adresse e-mail', emailText);

    return res.send({ message: 'Verification email sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Server error', error });
  }
};

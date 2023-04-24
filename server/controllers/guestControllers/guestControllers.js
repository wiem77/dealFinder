const User = require('../../models/User');
const Media = require('../../models/MediaModel');
const Location = require('../../models/LocationModel');
const path = require('path');

function generatePhoneNumber() {
  let phoneNumber = '+1';
  for (let i = 0; i < 10; i++) {
    phoneNumber += Math.floor(Math.random() * 10);
  }
  return phoneNumber;
}

function generateEmail() {
  const baseEmail = 'user+randomstring@example.com';
  const randomString = Math.random().toString(36).substring(2, 10);
  return baseEmail.replace('randomstring', randomString);
}

exports.createGuest = async (req, res, next) => {
  const { type, coordinates, formattedAddress, city, country } = req.body;

  try {
    const guestId = req.cookies.guestId;
    let guest;

    if (guestId) {
      guest = await User.findById(guestId);
    }

    if (!guest || guest.roles !== 'visiteur') {
      // create a new Location document first
      const location = new Location({
        type,
        coordinates,
        formattedAddress,
        city,
        country,
      });
      await location.save();
      console.log(location, 'location');
      const lastGuest = await User.findOne({ roles: 'visiteur' })
        .sort({ _id: -1 })
        .limit(1);
      let guestName = 'guest';

      if (lastGuest) {
        const lastNumber = parseInt(lastGuest.nom.slice(-1), 10);
        guestName += lastNumber + 1;
      } else {
        guestName += '1';
      }

      // create a new User document using the _id of the new Location document
      guest = new User({
        nom: guestName,
        prenom: 'guest',
        telephone: generatePhoneNumber(),
        email: generateEmail(),
        password: '',
        roles: 'visiteur',
        location: location._id,
      });
      console.log('guest', guest);
      const defaultAvatar = path.join(__dirname, '../public/image/Homme.png');
      const media = new Media({
        path: defaultAvatar,
        extension: 'png',
      });
      await media.save();

      guest.picturePath = [media._id];
      await guest.save();

      res.cookie('guestId', guest._id, { maxAge: 86400000 }); // 24 hours
    }

    res.status(201).json({
      success: true,
      data: guest,
    });
  } catch (error) {
    next(error);
  }
};

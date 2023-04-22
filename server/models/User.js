const mongoose = require('mongoose');
const { geocodeAddress } = require('../utils/geocoder');
const Location = require('./LocationModel');
const { Schema } = mongoose;
const UserSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
  },
  prenom: {
    type: String,
    required: true,
  },
  telephone: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    max: 50,
    unique: true,
    lowerCase: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirmpassword: {
    type: String,
  },
  picturePath: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Media' }],

  age: {
    type: Number,
  },
  sexe: {
    type: String,
  },

  locations: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Location',
      required: [true, 'Please add at least one location'],
    },
  ],

  roles: {
    type: String,
    enum: ['admin', 'consommateur', 'visiteur'],
    default: 'visiteur',
  },
  favorite_stores: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Store',
    },
  ],
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cart',
  },
  verified: Boolean,
});

UserSchema.pre('save', async function (next) {
  try {
    for (let i = 0; i < this.locations.length; i++) {
      const address = this.locations[i].address;
      const location = await geocodeAddress(address);
      this.locations[i].location = location;
    }
    next();
  } catch (error) {
    next(error);
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;

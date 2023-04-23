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
    unique: true,
  },
  email: {
    type: String,
    max: 50,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
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

UserSchema.path('telephone').validate(function (value) {
  if (this.roles === 'visiteur') {
    return true;
  }
  return value.length;
}, 'Please provide a valid phone number.');

UserSchema.path('email').validate(function (value) {
  if (this.roles === 'visiteur') {
    return true;
  }
  return value.length;
}, 'Please provide a valid email address.');

UserSchema.path('password').validate(function (value) {
  return this.roles === 'visiteur' ? !value : value.length;
}, 'Please provide a password.');

const User = mongoose.model('User', UserSchema);

module.exports = User;

const mongoose = require('mongoose');
const favoriteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    store: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Store',
      required: true,
    },
  },
  { timestamps: true }
);
const Favorites = mongoose.model('Favorites', favoriteSchema);

module.exports = Favorites;

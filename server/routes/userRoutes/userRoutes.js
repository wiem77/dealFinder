const express = require('express');
const router = express.Router();
const {
  addToFavoriteStores,
  removeFromFavoriteStores,
  updateFavorites,
} = require('../../controllers/favoritesController/Favorites');
const {
  newRating,
} = require('../../controllers/userController/userController');
const { auth } = require('../../middleWare/auth');
const updateStoreRating = require('../../utils/setStoreRating');
//http://localhost:4000/api/users/:userID/favorite-stores/:storeId
router.put('/:userID/favorite-stores/:storeId', updateFavorites);
//http://localhost:4000/api/users/:userID/favorite-stores/:storeId
router.delete(
  '/:userID/deletefavorite-stores/:storeId',
  removeFromFavoriteStores
);
//http://localhost:4000/api/users/newRating/:userId/:storeId
router.post('/newRating/:userId/:storeId', newRating);
module.exports = router;

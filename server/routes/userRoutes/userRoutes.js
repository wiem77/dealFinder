const express = require('express');
const router = express.Router();
const {
  addToFavoriteStores,
  removeFromFavoriteStores,
} = require('../../controllers/favoritesController/Favorites');
const {
  newRating,
} = require('../../controllers/userController/userController');
const updateStoreRating = require('../../utils/setStoreRating');
//http://localhost:4000/api/users/:userID/favorite-stores/:storeId
router.post('/:userID/favorite-stores/:storeId', addToFavoriteStores);
//http://localhost:4000/api/users/:userID/favorite-stores/:storeId
router.delete(
  '/:userID/deletefavorite-stores/:storeId',
  removeFromFavoriteStores
);
//http://localhost:4000/api/users/newRating/:userId/:storeId
router.post('/newRating/:userId/:storeId', newRating);
module.exports = router;

const express = require('express');
const router = express.Router();
const {
  addToFavoriteStores,
  removeFromFavoriteStores,
} = require('../../controllers/favoritesController/Favorites');
//http://localhost:4000/api/users/:userID/favorite-stores/:storeId
router.post('/:userID/favorite-stores/:storeId', addToFavoriteStores);
//http://localhost:4000/api/users/:userID/favorite-stores/:storeId
router.delete(
  '/:userID/deletefavorite-stores/:storeId',
  removeFromFavoriteStores
);
module.exports = router;

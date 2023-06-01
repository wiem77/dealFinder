const express = require('express');
const {
  getUsersAndCountRoles,
  addLocationStore,
  getNewlyAddedStores,
  getRecentVouchers,
} = require('../../controllers/AdminRoutes/AdminController');
const router = express.Router();
router.get('/stores/newly-added', getNewlyAddedStores);
router.get('/vouchers/newly-added', getRecentVouchers);
router.get('/users/stat', getUsersAndCountRoles);
router.post('/stores/:id/newLocation', addLocationStore);
module.exports = router;

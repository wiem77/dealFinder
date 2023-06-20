const express = require('express');
const {
  getUsersAndCountRoles,
  addLocationStore,
  getNewlyAddedStores,
  getRecentVouchers,
} = require('../../controllers/AdminRoutes/AdminController');
const { auth } = require('../../middleWare/auth');
const { roleCheck } = require('../../middleWare/roleCheck');
const { signInAdmin } = require('../../controllers/authUsers/auth');
const router = express.Router();
router.get('/stores/newly-added', getNewlyAddedStores);
router.get('/vouchers/newly-added', getRecentVouchers);
router.get('/users/stat', getUsersAndCountRoles);
router.post('/stores/:id/newLocation', addLocationStore);
//root:http://localhost:4000/api/admin/signINadmin
router.post('/signINadmin', signInAdmin);

module.exports = router;

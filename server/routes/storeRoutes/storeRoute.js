const express = require('express');
const {
  addStore,
  getAllStores,
  getAllStoresWithLocations,
  getStoreByName,
  deleteStore,
  updateStore,
  getOneStore,
  deleteLocationForStore,
  loginStore,
  logout,
} = require('../../controllers/storeController/storeController');
const { validateLocations } = require('../../utils/ValidationSchema');
const { updateStoreRating } = require('../../utils/setStoreRating');
const uploader = require('../../config/multerConfig');
const { auth } = require('../../middleWare/auth');
const router = express.Router();

//root:http://localhost:4000/api/store/loginStore
router.post('/loginStore', loginStore);
router.post('/logout', auth, logout);
//root:http://localhost:4000/api/store/addStore
router.post('/addStore', uploader.single('image'), addStore);

//root:http://localhost:4000/api/store/deleteStore/:id
router.delete('/deleteStore/:id', deleteStore);

//root:http://localhost:4000/api/store/updateStore/:id
router.put('/updateStore/:id', updateStore);

//root:http://localhost:4000/api/store/getAllStore
router.get('/getAllStore', getAllStores);

//root:http://localhost:4000/api/store/getAllStoreWithLocations
router.get('/getAllStoreWithLocations', getAllStoresWithLocations);

//root:http://localhost:4000/api/store/findOneStore/:name
router.get('/findOneStore/:name', getStoreByName);
//root:http://localhost:4000/api/store/findOneStoreById/:id
router.get('/findOneStoreById/:id', getOneStore);
//root:http://localhost:4000/api/store/stores/:storeId/locations/:locationId
router.delete('/stores/:storeId/locations/:locationId', deleteLocationForStore);
module.exports = router;

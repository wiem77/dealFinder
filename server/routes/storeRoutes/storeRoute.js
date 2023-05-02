const express = require('express');
const {
  addStore,
  getAllStores,
  getAllStoresWithLocations,
  getStoreByName,
  deleteStore,
  updateStore,
} = require('../../controllers/storeController/storeController');
const { validateLocations } = require('../../utils/ValidationSchema');
const uploader = require('../../config/multerConfig');
const router = express.Router();
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
module.exports = router;

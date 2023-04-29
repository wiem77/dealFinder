const express = require('express');
const {
  addLocation,
  createLocation,
} = require('../../controllers/locationController/Location');
const router = express.Router();
//root:http://localhost:4000/api/location/addLocation
router.post('/addLocation', createLocation);
module.exports = router;

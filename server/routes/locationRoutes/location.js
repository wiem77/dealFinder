const express = require('express');
const {
  addLocation,
} = require('../../controllers/locationController/Location');
const router = express.Router();
//root:http://localhost:4000/api/location/addLocation
router.post('/addLocation', addLocation);
module.exports = router;

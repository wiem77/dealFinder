const express = require('express');
const { createGuest } = require('../../controllers/guestControllers/guestControllers');
const router = express.Router();

//root:http://localhost:4000/api/guest/newGuest
router.post('/newGuest', createGuest);

module.exports = router;

const express = require('express');
const {
  createReservation,
} = require('../../controllers/reservationController/reservation');
const router = express.Router();

//root:http://localhost:4000/api/reservation/user/:userId/vouchers/:voucherId
router.post('/user/:userId/vouchers/:voucherId', createReservation);

module.exports = router;

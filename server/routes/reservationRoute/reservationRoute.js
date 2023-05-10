const express = require('express');
const {
  createReservation,
  getReservationWithUserId,
} = require('../../controllers/reservationController/reservation');
const router = express.Router();

//root:http://localhost:4000/api/reservation/user/:userId/vouchers/:voucherId
router.post('/user/:userId/vouchers/:voucherId', createReservation);

//root:http://localhost:4000/api/reservation/userReservation/:userId
router.get('/userReservation/:userId', getReservationWithUserId);

module.exports = router;

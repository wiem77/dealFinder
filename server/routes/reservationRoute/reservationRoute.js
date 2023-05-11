const express = require('express');
const {
  createReservation,
  getReservationWithUserId,
  resetArchivedReservations,
} = require('../../controllers/reservationController/reservation');
const router = express.Router();

//root:http://localhost:4000/api/reservation/user/:userId/vouchers/:voucherId
router.post('/user/:userId/vouchers/:voucherId', createReservation);

//root:http://localhost:4000/api/reservation/userReservation/:userId
router.get('/userReservation/:userId', getReservationWithUserId);

//root:http://localhost:4000/api/reservation/users/:userId/resetArchivedReservations/:reservationId
router.put(
  '/users/:userId/resetArchivedReservations/:reservationId',
  resetArchivedReservations
);

module.exports = router;

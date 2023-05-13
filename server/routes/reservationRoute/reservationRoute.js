const express = require('express');
const {
  createReservation,
  getReservationWithUserId,
  resetArchivedReservations,
  verifyCodeReservation,
} = require('../../controllers/reservationController/reservation');
const { auth } = require('../../middleWare/auth');
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

//root:http://localhost:4000/api/reservation/verify/:resCode
router.get('/verify/:resCode', auth, verifyCodeReservation);
module.exports = router;

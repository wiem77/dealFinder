const express = require('express');
const {
  createReservation,
  getReservationWithUserId,
  resetArchivedReservations,
  verifyCodeReservation,
  getAllReservationByIDUSer,
  getReservationByCode,
  getUserReservations,
  deleteReservation,
  checkReservation,
} = require('../../controllers/reservationController/reservation');
const { auth } = require('../../middleWare/auth');
const router = express.Router();

//root:http://localhost:4000/api/reservation/user/:userId/vouchers/:voucherId
router.post('/user/:userId/vouchers/:voucherId', createReservation);

//root:http://localhost:4000/api/reservation/userReservation/:userId
router.get('/userReservation/:userId', getReservationWithUserId);
//root:http://localhost:4000/api/reservation/userReservation/codeReseravtion/:reservationCode
router.get(
  '/userReservation/codeReseravtion/:reservationCode',
  getReservationByCode
);
//root:http://localhost:4000/api/reservation/userReservation/usedTrue/:userId
router.get('/userReservation/usedTrue/:userId', getUserReservations);
//root:http://localhost:4000/api/reservation/users/:userId/resetArchivedReservations/:reservationId
router.put(
  '/users/:userId/resetArchivedReservations/:reservationId',

  resetArchivedReservations
);

//root:http://localhost:4000/api/reservation/verify/:resCode/:store_id
router.get('/verify/:resCode/:store_id', verifyCodeReservation);

//root:http://localhost:4000/api/reservation/delete/reservation/:reservationId
router.delete('/delete/reservation/:reservationId', deleteReservation);
//root:http://localhost:4000/api/reservation/user/:userId/allReservation
router.get('/user/:userId/allReservation', getAllReservationByIDUSer);
//root:http://localhost:4000/api/reservation/users/:userId/stores/:storeId/reservation-check
router.get(
  '/users/:userId/stores/:storeId/reservation-check',
  checkReservation
);
module.exports = router;

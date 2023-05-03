const express = require('express');
const {
  createVoucher,
  updateVoucher,
  deleteVoucher,
} = require('../../controllers/voucherController/voucherController');
const router = express.Router();

//root:http://localhost:4000/api/vouchers/addVoucher
router.post('/addVoucher', createVoucher);

//root:http://localhost:4000/api/vouchers/updateVoucher/:id
router.put('/updateVoucher/:id', updateVoucher);

//root:http://localhost:4000/api/vouchers/deleteVoucher/:id
router.delete('/deleteVoucher/:id', deleteVoucher);
module.exports = router;

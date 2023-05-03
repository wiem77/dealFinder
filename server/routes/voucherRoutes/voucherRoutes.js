const express = require('express');
const {
  createVoucher,
  updateVoucher,
} = require('../../controllers/voucherController/voucherController');
const router = express.Router();

//root:http://localhost:4000/api/vouchers/addVoucher
router.post('/addVoucher', createVoucher);

//root:http://localhost:4000/api/vouchers/updateVoucher/:id
router.put('/updateVoucher/:id', updateVoucher);
module.exports = router;

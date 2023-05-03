const express = require('express');
const {
  createVoucher,
} = require('../../controllers/voucherController/voucherController');
const router = express.Router();

//root:http://localhost:4000/api/vouchers/addVoucher
router.post('/addVoucher', createVoucher);
module.exports = router;

const express = require('express');
const {
  createVoucher,
  updateVoucher,
  deleteVoucher,
  findVouchers,
  findVouchersByStoreId,
  findVoucherWithId,
} = require('../../controllers/voucherController/voucherController');
const router = express.Router();

//root:http://localhost:4000/api/vouchers/addVoucher
router.post('/addVoucher', createVoucher);

//root:http://localhost:4000/api/vouchers/updateVoucher/:id
router.put('/updateVoucher/:id', updateVoucher);

//root:http://localhost:4000/api/vouchers/deleteVoucher/:id
router.delete('/deleteVoucher/:id', deleteVoucher);

//root:http://localhost:4000/api/vouchers/
router.get('/', findVouchers);

//root:http://localhost:4000/api/vouchers/byStoreId/:id
router.get('/byStoreId/:id', findVouchersByStoreId);

//root:http://localhost:4000/api/vouchers/byVoucherId/:id
router.get('/VoucherId/:id', findVoucherWithId);
module.exports = router;

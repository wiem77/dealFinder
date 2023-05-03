const Category = require('../../models/CategoryModel');
const Store = require('../../models/StoreModel');
const Voucher = require('../../models/VoucherModel');
module.exports.createVoucher = async (req, res) => {
  try {
    const {
      name_V,
      description,
      validity_date,
      available_vouchers,
      discount,
      storeId,
    } = req.body;

    if (
      !name_V ||
      !description ||
      !validity_date ||
      !available_vouchers ||
      !discount ||
      !storeId
    ) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const store = await Store.findById(storeId);
    if (!store) {
      return res.status(404).json({ message: 'Store not found' });
    }

    const voucher = new Voucher({
      name_V,
      description,
      validity_date,
      available_vouchers,
      discount,
      store: storeId,
    });

    const savedVoucher = await voucher.save();

    store.vouchers.push(savedVoucher._id);
    await store.save();

    res.status(201).json(savedVoucher);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: 'An error occurred while creating the voucher' });
  }
};

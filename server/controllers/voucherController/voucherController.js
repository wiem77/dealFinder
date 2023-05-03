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

module.exports.updateVoucher = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name_V,
      description,
      validity_date,
      available_vouchers,
      discount,
      is_available,
    } = req.body;

    let voucher = await Voucher.findById(id);
    if (!voucher) {
      return res.status(404).json({ message: 'Voucher not found' });
    }

    voucher.name_V = name_V ?? voucher.name_V;
    voucher.description = description ?? voucher.description;
    voucher.validity_date = validity_date ?? voucher.validity_date;
    voucher.available_vouchers =
      available_vouchers ?? voucher.available_vouchers;
    voucher.discount = discount ?? voucher.discount;
    voucher.is_available =
      is_available !== undefined ? is_available : voucher.is_available;

    const updatedVoucher = await voucher.save();
    res.status(200).json(updatedVoucher);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: 'An error occurred while updating the voucher' });
  }
};
module.exports.deleteVoucher = async (req, res) => {
  const { id } = req.params;

  Voucher.findOne({
    _id: id,
  })
    .populate('store')
    .then((voucher) => {
      if (!voucher) {
        return res.status(400).send({ msg: 'voucher does not exist' });
      }
      const deletedVoucher = voucher;
      Voucher.deleteOne({ _id: id }).then(async () => {
        // Perform store-related operations here
        const store = await Store.findById(voucher.store._id);
        store.voucher_count = store.voucher_count - 1;
        await store.save();

        // Remove the voucher from the store
        await Store.findOneAndUpdate(
          { _id: voucher.store._id },
          { $pull: { vouchers: voucher._id }, $inc: { voucher_count: -1 } }
        );

        res.status(200).send({
          success: true,
          msg: 'voucher deleted',
          deletedVoucher,
        });
        console.log('Voucher deleted:', deletedVoucher);
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(400).send({ success: false, msg: error.message });
    });
};

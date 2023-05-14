const User = require('../../models/User');
const Store = require('../../models/StoreModel');
exports.addToFavoriteStores = async (req, res) => {
  console.log('testAddfav');
  const { storeId, userID } = req.params;
  console.log(storeId, userID);
  try {
    const store = await Store.findById(storeId);
    if (!store) {
      return res
        .status(404)
        .json({ success: false, message: 'Store not found' });
    }

    const user = await User.findByIdAndUpdate(
      userID,
      { $addToSet: { favorite_stores: storeId } },
      { new: true }
    );
    res
      .status(200)
      .json({ success: true, favorite_stores: user.favorite_stores });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'server error', error });
  }
};

exports.removeFromFavoriteStores = async (req, res) => {
  const { storeId, userID } = req.params;

  console.log(storeId, userID);
  try {
    const user = await User.findByIdAndUpdate(
      userID,
      { $pull: { favorite_stores: storeId } },
      { new: true }
    );
    res
      .status(200)
      .json({ success: true, favorite_stores: user.favorite_stores });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'server error', error });
  }
};

// exports.getAllFavorites = async (req, res) => {
//   const { userID } = req.params;
//   try {
//     const user = await User.find(userID, { favorite_stores });
//     res
//       .status(200)
//       .json({ success: true, favorite_stores: user.favorite_stores });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({ message: 'server error', error });
//   }
// };

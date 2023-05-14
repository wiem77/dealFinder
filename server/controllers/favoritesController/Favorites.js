const User = require('../../models/User');
const Store = require('../../models/StoreModel');
exports.addToFavoriteStores = async (req, res, next) => {
    const {storeId,userID} = req.params;
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
      next(error);
    }
  };
  
  exports.removeFromFavoriteStores = async (req, res, next) => {
    const {storeId,userID} = req.params;
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
      next(error);
    }
  };
  

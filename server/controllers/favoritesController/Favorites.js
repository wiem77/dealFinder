const User = require('../../models/User');
const Store = require('../../models/StoreModel');
const Favorites = require('../../models/favoriteModel');
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

exports.updateFavorites = async (req, res) => {
  try {
    const { userID, storeId } = req.params;
    console.log(req.params);
    console.log(userID, storeId);
    const user = await User.findById(userID);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: 'Utilisateur non trouvé' });
    }

    const store = await Store.findById(storeId);
    if (!store) {
      return res
        .status(404)
        .json({ success: false, message: 'Magasin non trouvé' });
    }

    const existingFavorite = await Favorites.findOne({
      user: userID,
      store: storeId,
    });

    if (existingFavorite) {
      await existingFavorite.deleteOne();

      user.favorite_stores.pull(storeId);
      await user.save();
      console.log('suppp');
      return res.status(200).json({
        success: true,
        message: "Magasin supprimé des favoris de l'utilisateur",
      });
    } else {
      const newFavorite = new Favorites({ user: userID, store: storeId });
      await newFavorite.save();

      user.favorite_stores.push(storeId);
      await user.save();

      return res.status(200).json({
        success: true,
        message: "Magasin ajouté aux favoris de l'utilisateur",
      });
    }
  } catch (error) {
    console.error(
      "Erreur lors de la mise à jour des favoris de l'utilisateur:",
      error
    );
    return res.status(500).json({
      success: false,
      message: "Erreur lors de la mise à jour des favoris de l'utilisateur",
    });
  }
};

exports.getAllFavorites = async (req, res) => {
  const { userID } = req.params;
  console.log(userID);
  try {
    const user = await User.findById(userID).populate('favorite_stores');
    console.log(user);
    res.status(200).json({ success: true, favorite_stores: user });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'server error', error });
  }
};

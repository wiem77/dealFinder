const SubCategory = require('../models/subCategoryModel');
module.exports.removeStoreFromSubCategory = async (storeId, subCategoryId) => {
  try {
    const subCategory = await SubCategory.findById(subCategoryId);
    if (!subCategory) {
      throw new Error(
        `La sous-catégorie avec l'ID ${subCategoryId} n'existe pas`
      );
    }
    subCategory.stores = subCategory.stores.filter((id) => id !== storeId);
    await subCategory.save();
  } catch (error) {
    console.error(error);
    throw new Error(
      `Une erreur s'est produite lors de la suppression du magasin avec l'ID ${storeId} de la sous-catégorie avec l'ID ${subCategoryId}`
    );
  }
};

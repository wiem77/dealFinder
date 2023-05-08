const SubCategory = require('../../models/subCategoryModel');
const Category = require('../../models/CategoryModel');
module.exports.addSubCategory = async (req, res) => {
  console.log(req.params);
  console.log('Add..');
  try {
    const categoryId = req.params.id;

    let subCategoryName = req.body.subCategory_name;

    if (!subCategoryName) {
      res.status(400).send({
        success: false,
        msg: 'subcategory name are required',
      });
      return;
    }

    subCategoryName = subCategoryName.trim().toUpperCase();
    const category = await Category.findOne({
      _id: categoryId,
    });

    if (!category) {
      return res.status(400).send({
        success: false,
        msg: `Category not found: ${categoryId}`,
      });
    }

    const subCategory = await SubCategory.findOne({
      subCategory_name: subCategoryName,
    });

    if (subCategory) {
      return res.status(400).send({
        success: false,
        msg: `Subcategory already exists: ${subCategoryName}`,
      });
    }

    const newSubCategory = new SubCategory({
      category: categoryId,
      subCategory_name: subCategoryName,
      stores: [],
    });
    await newSubCategory.save();

    category.subcategories.push(newSubCategory._id);
    await category.save();

    res.status(200).send({
      success: true,
      msg: 'Subcategory added successfully',
      newSubCategory,
    });
  } catch (error) {
    res.status(400).send({ success: false, msg: error.message });
  }
};
// module.exports.getAllSubCategories = (req, res) => {
//   SubCategory.find({})
//     .populate('subcategories')
//     .then((categories) => {
//       res.status(200).json(categories);
//     })
//     .catch((error) => {
//       res.status(400).send({ success: false, msg: error.message });
//     });
// };

module.exports.getSubCategoryById = (req, res) => {
  const SubcategoryId = req.params.id;

  SubCategory.findById(SubcategoryId)
    .then((subcategory) => {
      if (!subcategory) {
        return res.status(404).json({ msg: 'subcategory not found' });
      }
      res.status(200).json(subcategory);
    })
    .catch((error) => {
      res.status(400).send({ success: false, msg: error.message });
    });
};

module.exports.getSubCategoryByName = (req, res) => {
  const subcategoryName = req.params.name;

  SubCategory.findOne({ subCategory_name: subcategoryName })

    .then((category) => {
      if (!category) {
        return res.status(404).json({ msg: 'SubCategory not found' });
      }
      res.status(200).json(category);
    })
    .catch((error) => {
      res.status(400).send({ success: false, msg: error.message });
    });
};

module.exports.getAllSubCategories = (req, res) => {
  SubCategory.find({})
    .populate('category', 'category_name')
    .populate('stores', 'store_name')
    .then((subcategories) => {
      res.status(200).json(subcategories);
    })
    .catch((error) => {
      res.status(400).send({ success: false, msg: error.message });
    });
};

module.exports.updateSubCategory = (req, res) => {
  const subCategoryId = req.params.id;
  const { subCategory_name } = req.body;

  SubCategory.findOneAndUpdate(
    { _id: subCategoryId },
    { subCategory_name },
    { new: true }
  )
    .then((updatedSubCategory) => {
      if (!updatedSubCategory) {
        return res.status(400).send({ msg: 'subCategory not found' });
      }
      const promises = [];

      Promise.all(promises)
        .then(() => {
          res.status(200).send({
            success: true,
            msg: 'subCategory updated',
            updatedSubCategory,
          });
        })
        .catch((error) => {
          res.status(400).send({ success: false, msg: error.message, error });
        });
    })
    .catch((error) => {
      res.status(400).send({ success: false, msg: error.message, error });
    });
};
module.exports.deleteSubCategory = async (req, res) => {
  const subCategoryId = req.params.id;

  SubCategory.findOneAndDelete({ _id: subCategoryId })
    .populate('category', '_id')
    .then((deletedSubCategory) => {
      if (!deletedSubCategory) {
        return res.status(400).send({ msg: 'Subcategory not found' });
      }

      const categoryId = deletedSubCategory.category._id;

      Category.findOneAndUpdate(
        { _id: categoryId },
        { $pull: { subcategories: subCategoryId } },
        { new: true }
      )
        .then((updatedCategory) => {
          if (!updatedCategory) {
            return res
              .status(400)
              .send({ msg: 'Category not found for subcategory' });
          }

          res.status(200).send({
            success: true,
            msg: 'Subcategory deleted',
            deletedSubCategory,
          });
        })
        .catch((error) => {
          res.status(400).send({ success: false, msg: error.message, error });
        });
    })
    .catch((error) => {
      res.status(400).send({ success: false, msg: error.message, error });
    });
};
const removeStoreFromSubCategory = async (storeId, subCategoryId) => {
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

module.exports.deleteStoreFromSubCategory = async (req, res) => {
  const { id, subCategoryId } = req.params;
  try {
    await removeStoreFromSubCategory(id, subCategoryId);
    res.status(200).json({
      message: `Le magasin avec l'ID ${id} a été supprimé de la sous-catégorie avec l'ID ${subCategoryId}.`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

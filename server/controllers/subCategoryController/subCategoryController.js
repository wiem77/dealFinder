const SubCategory = require('../../models/subCategoryModel');
const Category = require('../../models/CategoryModel');
module.exports.addSubCategory = async (req, res) => {
  console.log('Add..');
  try {
    const categoryName = req.body.category_name;
    const subCategoryName = req.body.subCategory_name;

    if (!categoryName || !subCategoryName) {
      res.status(400).send({
        success: false,
        msg: 'Category name and subcategory name are required',
      });
      return;
    }

    const lowercaseCategoryName = categoryName.toLowerCase().replace(/ /g, '');
    const lowercaseSubCategoryName = subCategoryName
      .toLowerCase()
      .replace(/ /g, '');

    const category = await Category.findOne({
      category_name: lowercaseCategoryName,
    });

    if (!category) {
      return res.status(400).send({
        success: false,
        msg: `Category not found: ${req.body.category_name}`,
      });
    }

    const subCategory = await SubCategory.findOne({
      category: category._id,
      subCategory_name: lowercaseSubCategoryName,
    });

    if (subCategory) {
      return res.status(400).send({
        success: false,
        msg: `Subcategory already exists: ${req.body.subCategory_name}`,
      });
    }

    const newSubCategory = new SubCategory({
      category: category._id,
      subCategory_name: subCategoryName,
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
module.exports.getAllSubCategories = (req, res) => {
  Category.find({})
    .populate('subcategories')
    .then((categories) => {
      res.status(200).json(categories);
    })
    .catch((error) => {
      res.status(400).send({ success: false, msg: error.message });
    });
};

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
    .populate('category')
    .then((subcategories) => {
      res.status(200).json(subcategories);
    })
    .catch((error) => {
      res.status(400).send({ success: false, msg: error.message });
    });
};

module.exports.updateSubCategory = (req, res) => {
  const subCategoryId = req.params.id;
  const subCategory_name = req.body;

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

      // Execute all subcategory update promises
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

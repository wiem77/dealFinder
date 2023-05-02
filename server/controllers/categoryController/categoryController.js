const Category = require('../../models/CategoryModel');
const SubCategory = require('../../models/subCategoryModel');
const Media = require('../../models/MediaModel');
module.exports.addCategory = async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(422).send({ error: 'Icon is required' });
    }
    const fileName = req.file.filename;

    const media = new Media({
      path: `C:/Users/User/Desktop/All/DealFinder/server/controllers/image/${fileName}`,
      extension: fileName.split('.').pop(),
    });

    await media.save();

    const categoryName = req.body.category_name.trim().toUpperCase();
    const existingCategory = await Category.findOne({
      category_name: categoryName,
    });
    if (existingCategory) {
      return res.status(409).send({ error: 'Category already exists' });
    }
    const newCategory = new Category({
      category_name: categoryName,
      subcategories: [],
      category_image: media._id,
    });
    await newCategory.save();
    res.status(200).send({ success: true, data: newCategory });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Server error' });
  }
};

module.exports.deleteCategory = async (req, res) => {
  console.log('delete..');
  const categoryId = req.params.id;
  console.log(req.params);
  Category.findOne({
    _id: categoryId,
  })
    .populate('subcategories')
    .then((category) => {
      if (!category) {
        return res.status(400).send({ msg: 'Category does not exist' });
      }
      SubCategory.deleteMany({
        _id: { $in: category.subcategories },
      }).then((sub) => {
        console.log('SubCategory deleted');
      });
      Category.deleteOne({ _id: category._id }).then(() => {
        res.status(200).send({ success: true, msg: 'Category deleted' });
        console.log('Category deleted');
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(400).send({ success: false, msg: error.message });
    });
};

module.exports.updateCategory = (req, res) => {
  const categoryId = req.params.id;
  const { category_name, subcategories } = req.body;

  Category.findOneAndUpdate(
    { _id: categoryId },
    { category_name, subcategories },
    { new: true }
  )
    .then((updatedCategory) => {
      if (!updatedCategory) {
        return res.status(400).send({ msg: 'Category not found' });
      }
      const promises = [];

      // Updating subcategories
      if (subcategories && subcategories.length > 0) {
        subcategories.forEach((subCategoryId) => {
          const promise = SubCategory.findOneAndUpdate(
            { _id: subCategoryId },
            { category: updatedCategory._id },
            { new: true }
          ).exec();
          promises.push(promise);
        });
      }

      // Execute all subcategory update promises
      Promise.all(promises)
        .then(() => {
          res.status(200).send({
            success: true,
            msg: 'Category updated',
            updatedCategory,
          });
        })
        .catch((error) => {
          res.status(400).send({ success: false, msg: error.message });
        });
    })
    .catch((error) => {
      res.status(400).send({ success: false, msg: error.message });
    });
};
module.exports.getAllCategories = (req, res) => {
  Category.find({})
    .populate('subcategories')
    .populate('category_image')
    .then((categories) => {
      res.status(200).send({ success: true, categories: categories });
      console.log('All categories fetched successfully');
    })
    .catch((error) => {
      console.log(error);
      res.status(400).send({ success: false, msg: error.message, error });
    });
};

module.exports.findCategory = (req, res) => {
  const categoryId = req.params.id;
  const categoryName = req.params.name;

  Category.findOne({
    $or: [{ _id: categoryId }, { category_name: categoryName }],
  })
    .populate('subcategories')
    .then((category) => {
      if (!category) {
        return res
          .status(400)
          .send({ success: false, msg: 'Category not found' });
      }
      res.status(200).send({ success: true, category });
    })
    .catch((error) => {
      res.status(400).send({ success: false, msg: error.message });
    });
};

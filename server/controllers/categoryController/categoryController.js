const Category = require('../../models/CategoryModel');
const SubCategory = require('../../models/subCategoryModel');
const Media = require('../../models/MediaModel');
module.exports.addCategory = async (req, res) => {
  const categoryName = req.body.category_name.trim().toUpperCase();

  console.log(categoryName);
  try {
    console.log('test1');
    const file = req.file;

    if (!file) {
      console.log('test2');
      return res.status(422).send({ error: 'Icon is required' });
    }
    const fileName = req.file.filename;
    console.log('test3');
    const media = new Media({
      path: `${req.protocol}://${req.headers.host}/public/image/${fileName}`,
      extension: fileName.split('.').pop(),
    });

    await media.save();
    console.log(req.body);
    console.log('test3');
    const existingCategory = await Category.findOne({
      category_name: categoryName,
    });
    console.log('test4');
    if (existingCategory) {
      console.log('test5');
      return res.status(409).send({ error: 'Category already exists' });
    }
    const newCategory = new Category({
      category_name: categoryName,
      subcategories: [],
      category_image: media._id,
    });
    console.log('test6');
    await newCategory.save(newCategory);
    console.log(newCategory);
    res.status(200).send({ success: true, data: newCategory });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Server error', message: error.message });
  }
};

module.exports.deleteCategory = async (req, res) => {
  const categoryId = req.params.id;

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
      }).then(() => {
        console.log('SubCategory deleted');
      });
      Category.deleteOne({ _id: category._id }).then(() => {
        res.status(200).send({
          success: true,
          msg: 'Category deleted',
          deletedCategory: category,
        });
        console.log('Category deleted:', category);
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(400).send({ success: false, msg: error.message });
    });
};

module.exports.updateCategory = async (req, res) => {
  const categoryId = req.params.id;
  const { category_name } = req.body;
  console.log(req.file);
  let _idImgae;
  if (req.file) {
    const fileName = req.file.filename;
    const media = new Media({
      path: `${req.protocol}://${req.headers.host}/public/image/${fileName}`,
      extension: fileName.split('.').pop(),
    });
    await media.save();
    _idImgae = media._id;
  }
  Category.findOneAndUpdate(
    { _id: categoryId },
    { category_name, category_image: _idImgae },
    { new: true }
  )
    .then((updatedCategory) => {
      if (!updatedCategory) {
        return res.status(400).send({ msg: 'Category not found' });
      }

      res.status(200).send({
        success: true,
        msg: 'Category updated',
        updatedCategory,
      });
    })
    .catch((error) => {
      res.status(400).send({ success: false, msg: error.message });
    });
};

module.exports.getAllCategories = (req, res) => {
  console.log('get all categories....');
  Category.find({})
    .populate({
      path: 'subcategories',
      populate: {
        path: 'stores',
        model: 'Store',
        select: '-accesscode',
        populate: [
          {
            path: 'vouchers',
            model: 'Voucher',
          },
          {
            path: 'locations',
            model: 'Location',
          },
        ],
      },
    })
    .populate('category_image')
    .then((categories) => {
      res.status(200).send({ success: true, categories: categories });
      console.log(categories);
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
    .populate('category_image')
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

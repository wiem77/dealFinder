const express = require('express');
const {
  addCategory,
  deleteCategory,
  updateCategory,
  getAllCategories,
  findCategory,
} = require('../../controllers/categoryController/categoryController');
const uploader = require('../../config/multerConfig');
const router = express.Router();
//root:http://localhost:4000/api/category/addCategory
router.post('/addCategory', uploader.single('image'), addCategory);
//root:http://localhost:4000/api/category/getAllCategory
router.get('/getAllCategory', getAllCategories);
//root:http://localhost:4000/api/category/findOneCategory/:id
router.get('/findOneCategory/:id', findCategory);

//root:http://localhost:4000/api/category/updateCategory/:id
router.put('/updateCategory/:id', uploader.single('image'), updateCategory);
//root:http://localhost:4000/api/category/deletecategory/:id
router.delete('/deletecategory/:id', deleteCategory);
module.exports = router;

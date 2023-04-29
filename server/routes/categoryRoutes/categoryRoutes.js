const express = require('express');
const {
  addCategory,
  deleteCategory,
  updateCategory,
  getAllCategories,
  findCategory,
} = require('../../controllers/categoryController/categoryController');
const router = express.Router();
//root:http://localhost:4000/api/category/updateCategory/:id
router.put('/updateCategory/:id', updateCategory);
//root:http://localhost:4000/api/category/deletecategory/:id
router.delete('/deletecategory/:id', deleteCategory);
//root:http://localhost:4000/api/category/addCategory
router.post('/addCategory', addCategory);
//root:http://localhost:4000/api/category/getAllCategory
router.get('/getAllCategory', getAllCategories);
//root:http://localhost:4000/api/category/findOneCategory/:id
router.get('/findOneCategory/:id', findCategory);
module.exports = router;

const express = require('express');
const {
  addSubCategory,
  getAllSubCategories,
  getSubCategoryById,
  getSubCategoryByName,
  updateSubCategory,
  deleteSubCategory,
  deleteStoreFromSubCategory,
} = require('../../controllers/subCategoryController/subCategoryController');
const router = express.Router();
//Root:http://localhost:4000/api/subCategory/add_sub_Category/id
router.post('/add_sub_Category/:id', addSubCategory);
//Root:http://localhost:4000/api/subCategory/getAll_sub_Category
router.get('/getAll_sub_Category', getAllSubCategories);
//Root:http://localhost:4000/api/subCategory/getById_sub_Category/:id
router.get('/getById_sub_Category/:id', getSubCategoryById);
//Root:http://localhost:4000/api/subCategory/getByName_sub_Category/:name
router.get('/getByName_sub_Category/:name', getSubCategoryByName);
//Root:http://localhost:4000/api/subCategory/gupdate_sub_Category/:id
router.put('/update_sub_Category/:id', updateSubCategory);
//Root:http://localhost:4000/api/subCategory/delete_sub_Category/:id
router.delete('/delete_sub_Category/:id', deleteSubCategory);
//Root:http://localhost:4000/api/subCategory/:subCategoryId/stores/:id
router.delete(
  '/:subCategoryId/stores/:id',
  deleteStoreFromSubCategory
);

module.exports = router;

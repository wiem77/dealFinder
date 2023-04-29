const mongoose = require('mongoose');

const subCategorySchema = new mongoose.Schema(
  {
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    subCategory_name: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const SubCategory = mongoose.model('SubCategory', subCategorySchema);

module.exports = SubCategory;

const mongoose = require('mongoose');
const { Schema } = mongoose;
const subCategorySchema = new mongoose.Schema(
  {
    subCategory_name: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const SubCategory = mongoose.model('SubCategory', subCategorySchema);

module.exports = SubCategory;

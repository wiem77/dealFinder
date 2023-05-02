const mongoose = require('mongoose');
const { Schema } = mongoose;
const categorySchema = new mongoose.Schema(
  {
    category_name: { type: String, required: true, unique: true },
    subcategories: [{ type: Schema.Types.ObjectId, ref: 'SubCategory' }],
    category_image: [{ type: Schema.Types.ObjectId, ref: 'Media' }],
  },
  { timestamps: true }
);

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;

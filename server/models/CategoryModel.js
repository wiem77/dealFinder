const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
  {
    category_name: { type: String, required: true, unique: true },
    subcategories: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'SubCategory' },
    ],

    category_image: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Media' }],
  },
  { timestamps: true }
);

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;

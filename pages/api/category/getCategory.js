import Category from '../../../backend/models/categoryModel';
import connectDB from '../../../backend/config/db';

connectDB();

// @route GET api/category
// @desc Get all categories
// @access Private
export default async function handler(req, res) {
  const { name } = req.body;
  const newCategory = new Category({
    name,
  });

  const category = await newCategory.save();
  res.status(200).json({
    success: true,
    message: 'Category created successfully',
    category,
  });
}

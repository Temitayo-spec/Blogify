import Category from '../../../models/categoryModel';

// @route POST api/category
// @desc Create a category
// @access Private
export default async function handler(req, res) {
  const categories = await Category.find();
  res.status(200).json({
    success: true,
    message: 'Categories fetched successfully',
    categories,
  });
}

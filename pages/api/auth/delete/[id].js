import Post from "../../../../models/postModel";
import User from "../../../../models/userModel";


// @route DELETE api/auth/delete/:id
// @desc Delete user
// @access Private
export default async function handler(req, res) {
  const user = await User.findById(req.user.id);

  if (user && user._id.toString() === req.user.id.toString()) {
    try {
      await Post.deleteMany({ username: user.username });
    } catch (error) {
      res.status(500);
      throw new Error('Something went wrong');
    }
    await user.remove();
    res.json({ message: 'User removed successfully' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
}

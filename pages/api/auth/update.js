import User  from '../../../models/userModel';
import connectDB from '../../../config/db';

connectDB();

// @route PUT api/auth/update
// @desc Update user details
// @access Private
export default async function handler(req, res) {
  const { name, email, password } = req.body;

  // check if profile image is provided
  if (req.file) {
    const user = await User.findById(req.user.id);

    // check if user is found
    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }

    // check if user is updating their own profile
    if (user.id !== req.user.id) {
      res.status(401);
      throw new Error('Unauthorized');
    }

    if (user) {
      user.name = name || user.name;
      user.email = email || user.email;
      user.password = password || user.password;
      user.profile = {
        data: fs.readFileSync('upload/' + req.file.filename),
        contentType: req.file.mimetype,
      };

      // change the username on post made by user
      await Post.updateMany(
        { userId: req.user._id },
        { $set: { username: user.name } }
      );

      const updatedUser = await user.save();

      res.status(201).json({
        success: true,
        message: 'User updated successfully',
        user: {
          ...updatedUser._doc,
          profile: {
            data: updatedUser.profile.data.toString('base64'),
            contentType: updatedUser.profile.contentType,
          },
        },
      });
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  } else {
    const user = await User.findById(req.user.id);

    // check if user is found
    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }

    // check if user is updating their own profile
    if (user.id !== req.user.id) {
      res.status(401);
      throw new Error('Unauthorized');
    }

    if (user) {
      user.name = name || user.name;
      user.email = email || user.email;
      user.password = password || user.password;

      // change the username on post made by user
      await Post.updateMany(
        { userId: req.user._id },
        { $set: { username: user.name } }
      );

      const updatedUser = await user.save();

      res.status(201).json({
        success: true,
        message: 'User updated successfully',
        user: {
          ...updatedUser._doc,
          profile: {
            data: '',
            contentType: '',
          },
        },
      });
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  }
}

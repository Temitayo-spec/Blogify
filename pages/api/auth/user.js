import { User } from '../../../backend/models/userModel';
import connectDB from '../../../backend/config/db';

connectDB();

// @route GET api/auth/user
// @desc Get user profile
// @access Private
export default async function handler(req, res) {
  const user = await User.findById(req.user.id).select('-password');

  if (user.profile.data !== '') {
    res.json({
      success: true,
      user: {
        ...user._doc,
        profile: {
          data: user.profile.data.toString('base64'),
          contentType: user.profile.contentType,
        },
      },
    });
  } else {
    res.json({
      success: true,
      user: {
        ...user._doc,
        profile: {
          data: '',
          contentType: '',
        },
      },
    });
  }
}

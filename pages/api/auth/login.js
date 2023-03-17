import { generateToken } from '../../../utils/generateToken';
import bcrypt from 'bcrypt';
import User from '../../../models/userModel';

// @route POST api/auth/login
// @desc Login user / Returning JWT token
// @access Public
export default async function handler(req, res) {
  const { email, password } = req.body;

  // Simple validation
  if (!email || !password) {
    res.status(400);
    throw new Error('Please provide an email and password');
  }

  // Check for existing user
  const user = await User.findOne({ email });
  if (!user) {
    res.status(400);
    throw new Error('User does not exist');
  }

  // Validate password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    res.status(400);
    throw new Error('Invalid credentials');
  }

  if (user) {
    res.status(200).json({
      success: true,
      message: 'Login successful',
      user: {
        ...user._doc,
        profile: {
          data: user.profile.data.toString('base64'),
          contentType: user.profile.contentType,
        },
      },
      token: generateToken(user._id),
    });
  }
}

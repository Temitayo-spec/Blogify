import { generateToken } from '../../../utils/generateToken';
import * as fs from 'fs';
import bcrypt from 'bcrypt';
import User from '../../../models/userModel';


// @route   POST api/auth/register
// @desc    Register new user
// @access  Public
export default async function handler(req, res) {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please enter all fields');
  }

  // hashing the password
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  // check if profile image is provided
  if (req.file) {
    const user = new User({
      name,
      email,
      password: passwordHash,
      profile: {
        data: fs.readFileSync('upload/' + req.file.filename),
        contentType: req.file.mimetype,
      },
    });

    const createdUser = await user.save();

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      user: {
        ...createdUser._doc,
        profile: {
          data: createdUser.profile.data.toString('base64'),
          contentType: createdUser.profile.contentType,
        },
      },
      token: generateToken(createdUser._id),
    });
  } else {
    const user = new User({
      name,
      email,
      password: passwordHash,
    });

    const createdUser = await user.save();

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      user: {
        ...createdUser._doc,
        profile: {
          data: '',
          contentType: '',
        },
      },
    });
  }
}

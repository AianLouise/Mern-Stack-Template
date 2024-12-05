import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';
import bcryptjs from 'bcryptjs';

export const test = (req, res) => {
  res.json({
    message: 'API is working!',
  });
};

// Get user profile
export const getUserProfile = async (req, res, next) => {
  try {
    // Find the user by ID and exclude the password field
    const user = await User.findById(req.user.id).select('-password');

    // If user is not found, return a 404 error
    if (!user) {
      console.log('User not found:', req.user.id);
      return next(errorHandler(404, 'User not found'));
    }

    // Return the user profile data
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    next(errorHandler(500, 'Internal Server Error'));
  }
};

// Update user
export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, 'You can update only your account!'));
  }
  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          profilePicture: req.body.profilePicture,
        },
      },
      { new: true }
    );
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

// Delete user
export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, 'You can delete only your account!'));
  }
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json('Account has been deleted!');
  } catch (error) {
    next(error);
  }
};
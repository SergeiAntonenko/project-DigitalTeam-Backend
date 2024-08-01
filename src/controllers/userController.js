import createHttpError from 'http-errors';
import mongoose from 'mongoose';
import fs from 'node:fs/promises';
import { getOneUser, updateUser } from '../services/userServices.js';
import { UsersCollection } from '../db/models/user.js';
import { saveFile } from '../utils/saveFile.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';

export const getAllUsersController = async (req, res, next) => {
  try {
    const count = await UsersCollection.countDocuments();

    res.status(200).json({
      message: 'Total number of registered users',
      totalUsers: count,
    });
  } catch (err) {
    next(createHttpError(500, 'Internal server error'));
  }
};

export const getUserByIdController = async (req, res, next) => {
  const userId = req.user._id;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(404).json({
      data: 'ID not found',
    });
  }

  const user = await UsersCollection.findById(userId);
  if (!user) {
    next(createHttpError(404, 'User not found'));
    return;
  }

  res.status(200).json({
    status: 200,
    message: 'User information',
    data: user,
  });
};

export const updateUserController = async (req, res, next) => {
  const userId = req.user._id;

  const result = await updateUser(userId, req.body.data);

  if (!result) {
    next(createHttpError(404, 'User not found'));
    return;
  }

  res.status(200).json({
    status: 200,
    message: 'User information updated successfully',
    data: result.user,
  });
};

export async function updateAvatar(req, res) {
  const options = {
    use_filename: true,
    unique_filename: true,
    overwrite: false,
    transformation: [
      { width: 250, height: 250, gravity: 'faces', crop: 'thumb' },
      { radius: 'max' },
    ],
  };
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'You must add a file' });
    }
    const result = await saveFileToCloudinary(req.file, options);
    await fs.unlink(req.file.path);
    const user = await UsersCollection.findByIdAndUpdate(
      req.body.id,
      { avatar: result },
      { new: true },
    );
    if (user) {
      res.status(200).json({
        avatar: user.avatar,
      });
    } else {
      return res.status(404).json('User not found');
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

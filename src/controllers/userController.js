import createHttpError from 'http-errors';
import mongoose from 'mongoose';
import { getOneUser, updateUser } from '../services/userServices.js';
import { UsersCollection } from '../db/models/user.js';
import { saveFile } from '../utils/saveFile.js';

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
  const { update } = req.params;
  const photo = req.file;

  if (photo) {
    // req.body.avatar = photo.path;
    await saveFile(photo);
  }

  const result = await updateUser(update, req.body);

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

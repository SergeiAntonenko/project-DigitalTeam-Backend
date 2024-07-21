import createHttpError from 'http-errors';
import mongoose from 'mongoose';
import { getOneUser, updateUser } from '../services/userServices.js';
// import { UsersCollection } from '../db/models/usersCollection.js';

// export const getAllUsersController = async (res, req) => {
//   const users = await UsersCollection.find();
//   return users;
// };

export const getUserByIdController = async (req, res, next) => {
  const { userId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(404).json({
      data: 'ID not found',
    });
  }

  const user = await getOneUser(userId);
  if (!user) {
    next(createHttpError(404, 'User not found'));
    return;
  }

  res.status(200).json({
    message: 'User information',
    data: user,
  });
};

export const updateUserController = async (req, res, next) => {
  const { userId } = req.params;

  const result = await updateUser(userId, req.body);
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

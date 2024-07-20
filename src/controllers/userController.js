import createHttpError from 'http-errors';
import { updateUser } from '../services/userServices';

export const updateUserController = async (req, res, next) => {
  const { userId } = req.params;

  const result = await updateUser(userId, req.body);
  if (!result) {
    next(createHttpError(404, 'User not found'));
    return;
  }

  res.status(200).json({
    status: 200,
    message: 'Successfuly update user',
    data: result.user,
  });
};

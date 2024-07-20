import createHttpError from 'http-errors';
import UserCollection from '../db/models/user.js';

export const getOneUser = async (userId) => {
  const user = await UserCollection.findById(userId);
  return user;
};

export const updateUser = async (userId, payload, options = {}) => {
  const user = await UserCollection.findOneAndUpdate({ _id: userId }, payload, {
    new: true,
    includeResultMetadata: true,
    ...options,
  });
  if (!user || !user.value) {
    throw createHttpError(404, 'User not foun');
  }

  return {
    user: user.value,
    isNew: Boolean(user?.lastErrorObject?.upserted),
  };
};

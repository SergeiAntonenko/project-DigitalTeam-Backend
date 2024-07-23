import createHttpError from 'http-errors';
import { UsersCollection } from '../db/models/user.js';
import { saveFile } from '../utils/saveFile.js';

export const getOneUser = async (userId) => {
  const user = await UsersCollection.findById(userId);
  return user;
};

export const updateUser = async (userId, payload, options = {}) => {
  const user = await UsersCollection.findOneAndUpdate(
    { _id: userId },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );
  if (!user || !user.value) {
    throw createHttpError(404, 'User not found');
  }

  return {
    user: user.value,
    isNew: Boolean(user?.lastErrorObject?.upserted),
  };
};

export const upsertUsers = async ({ photo, ...payload }, userId) => {
  let url;

  if (photo) {
    url = await saveFile(photo);
  }

  const user = await UsersCollection.create({
    ...payload,
    userId: userId,
    photo: url,
  });

  return user;
};

import createHttpError from 'http-errors';

export const updateUser = async (userId, payload, options = {}) => {
  const user = await UserColection.findOneAndUpdate({ _id: userId }, payload, {
    new: true,
    includeResultMetadata: true,
    ...options,
  });
  if (!user || !user.value) {
    throw createHttpError(404, 'User not foun');
  }

  return {
    user: user.value,
    isNew: Boolean(contact?.lastErrorObject?.upserted),
  };
};

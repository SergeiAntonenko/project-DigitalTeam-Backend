import createHttpError from 'http-errors';
import { isValidObjectId } from 'mongoose';

const userValidMongoId = (req, res, next) => {
  const { userId } = req.params;
  if (!isValidObjectId(userId)) {
    next(createHttpError(400, 'Invalid ID'));
  }

  next();
};

export default userValidMongoId;

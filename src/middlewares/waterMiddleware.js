import createHttpError from 'http-errors';
import { Types } from 'mongoose';
import {
  checkWaterAmountValidator,
  checkDateTotalWaterValidator,
} from '../validation/waterValidatior.js';
import {
  dateNormalizer,
  localDate,
  getWaterCountId,
} from '../services/waterServices.js';

export const checkWaterAmountMiddleware = (req, res, next) => {
  try {
    const { value, err } = checkWaterAmountValidator(req.body);
    if (err) {
      return next(createHttpError(400, 'Bad Request', { errors: err }));
    }

    if (value.localDate) {
      if (typeof value.localDate !== 'string') {
        return next(createHttpError(400, 'Invalid date format (YY-MM-DD)'));
      }

      const normalizedDate = dateNormalizer(value.localDate);
      req.body = { ...value, localDate: normalizedDate };
    } else {
      req.body = { ...value, localDate: localDate() };
    }

    next();
  } catch (e) {
    next(e);
  }
};

export const checkIdMiddleware = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!Types.ObjectId.isValid(id)) {
      return next(createHttpError(400, 'Invalid ID format'));
    }

    const waterCount = await getWaterCountId(id);

    if (!waterCount || waterCount.user.toString() !== req.user.id) {
      return next(createHttpError(404, 'Water record not found'));
    }

    req.water = waterCount;
    next();
  } catch (e) {
    next(e);
  }
};

export const checkAllWaterAmountMiddleware = async (req, res, next) => {
  try {
    const { value, error } = checkDateTotalWaterValidator(req.body);

    if (error) {
      return next(
        createHttpError(400, 'Bad Request', { errors: error.details }),
      );
    }

    if (value.localDate) {
      const normalizedDate = dateNormalizer(value.localDate);
      req.body.localDate = normalizedDate;
    } else {
      req.body.localDate = localDate();
    }

    next();
  } catch (e) {
    next(e);
  }
};

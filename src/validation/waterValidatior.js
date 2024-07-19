import Joi from 'joi';
import { joiValidator } from '../utils/joiValidator.js';

export const checkWaterAmountValidator = joiValidator((data) =>
  Joi.object()
    .options({ abortEarly: false })
    .keys({
      localDate: Joi.date().iso().required(),
      localTime: Joi.string()
        .length(5)
        .required()
        .pattern(/^(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])$/),
      waterValue: Joi.number().min(0).required(),
    })
    .validate(data),
);

export const checkDateTotalWaterValidator = joiValidator((data) =>
  Joi.object()
    .options({ abortEarly: false })
    .keys({
      localDate: Joi.date().iso().required(),
    })
    .validate(data),
);

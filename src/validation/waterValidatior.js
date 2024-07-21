import Joi from 'joi';
import { joiValidator } from '../utils/joiValidator.js';
import { date } from '../constants/regex.js';
import { time } from '../constants/regex.js';

export const checkWaterAmountValidator = joiValidator((data) =>
  Joi.object()
    .options({ abortEarly: false })
    .keys({
      localDate: Joi.string().pattern(new RegExp(date)).length(10),
      localTime: Joi.string().pattern(new RegExp(time)).length(5),
      waterValue: Joi.number().required(),
    })
    .validate(data),
);

export const checkDateTotalWaterValidator = joiValidator((data) =>
  Joi.object()
    .options({ abortEarly: false })
    .keys({
      localDate: Joi.string().pattern(new RegExp(date)).length(10),
    })
    .validate(data),
);

import Joi from 'joi';

export const updateUserShema = Joi.object({
  name: Joi.string().min(3).max(20),
  email: Joi.string().email(),
  gender: Joi.valid('men', 'women'),
  vage: Joi.number(),
  timeActiviti: Joi.number(),
  waterInDay: Joi.number(),
});

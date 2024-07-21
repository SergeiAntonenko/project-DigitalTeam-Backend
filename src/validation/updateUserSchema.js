import Joi from 'joi';

export const updateUserSchema = Joi.object({
  name: Joi.string().min(3).max(20),
  email: Joi.string().email(),
  gender: Joi.valid('men', 'women', 'other'),
  weight: Joi.number(),
  dailyWaterGoal: Joi.number(),
});

import Joi from 'joi';

export const updateUserSchema = Joi.object({
  name: Joi.string().min(3).max(20).optional(),
  email: Joi.string().email().optional(),
  gender: Joi.string().valid('male', 'woman', 'other').optional(),
  weight: Joi.number().min(0).optional(),
  activeTime: Joi.number().min(0).optional(),
  dailyWaterGoal: Joi.number().min(0).optional(),
});

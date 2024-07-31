import Joi from 'joi';

export const updateUserSchema = Joi.object({
  name: Joi.string().min(2).max(40).message('1').optional(),
  email: Joi.string().email().message('2').optional(),
  gender: Joi.string().valid('Man', 'Woman').optional(),
  weight: Joi.number().min(0).max(600).message('3').optional(),
  avatar: Joi.optional(),
  activeTime: Joi.number().min(0).max(12).message('4').optional(),
  dailyWaterGoal: Joi.number().min(0).max(1000).message('5').optional(),
});

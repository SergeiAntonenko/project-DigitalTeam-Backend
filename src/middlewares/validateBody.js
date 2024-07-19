import createHttpError from 'http-errors';

export const validateBody = (schema) => async (req, res, next) => {
  try {
    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (err) {
    const errors = err.details.map((detail) => detail.message);
    const error = createHttpError(400, 'Bad Request', {
      errors,
    });
    next(error);
  }
};

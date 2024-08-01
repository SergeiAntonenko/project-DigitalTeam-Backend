import createHttpError from 'http-errors';

export const userValidateBody = (shema) => async (req, res, next) => {
  try {
    await shema.validateAsync(req.body.data, { abortEarly: false });

    next();
  } catch (err) {
    const error = createHttpError(400, 'Bad Request', {
      errors: err.detalis,
    });
    next(error);
  }
};

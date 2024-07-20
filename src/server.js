import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { env } from './utils/env.js';
// import usersRouter from './routers/src/users.js';
import createHttpError from 'http-errors';
// import mainRouter from './routers/index.js';
import cookieParser from 'cookie-parser';
import { UPLOAD_DIR } from './users/index.js';
import { swaggerDocs } from './middlewares/swaggerDocs.js';

const PORT = process.env.PORT || Number(env('PORT', '3000'));

export const setupServer = () => {
  const app = express();

  app.use('/uploads', express.static(UPLOAD_DIR));

  app.use(
    express.json({
      type: ['application/json', 'application/vnd.api+json'],
    }),
  );

  app.use(cors());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.use(cookieParser());
  app.use('/api-docs', ...swaggerDocs());

  // app.use(mainRouter);

  // Add routers to 'app' as 'middleware'
  // app.use('/src/users', usersRouter);

  // Handling server errors
  const errorHandler = (err, req, res, next) => {
    // Check, did we receive an error from createHttpError (http://localhost:3000/contacts/777)
    if (err instanceof createHttpError.HttpError) {
      res.status(err.status).json({
        status: err.status,
        message: err.message,
        ...(err.errors && { data: { errors: err.errors } }), // Display error messages only if there are errors
      });
    } else {
      res.status(500).json({
        status: 500,
        message: 'Something went wrong',
      });
    }
  };

  // Handling non-existent routes http://localhost:3000/cont7777acts/
  //localhost:3000/
  const notFoundHandler = (req, res, next) => {
    res.status(404).json({
      status: 404,
      message: 'Route not found',
    });
  };

  //Applying 'middleware' for error handling
  app.use('*', notFoundHandler);
  app.use(errorHandler);

  app.get('/api-docs', swaggerDocs());

  app.use('/uploads', express.static(UPLOAD_DIR));

  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });
};

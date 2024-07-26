import express from 'express';
import dotenv from 'dotenv';
import pino from 'pino-http';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { env } from './utils/env.js';
import { UPLOAD_DIR } from './users/index.js';
import router from './routes/index.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { swaggerDocs } from './middlewares/swaggerDocs.js';

dotenv.config();
const PORT = Number(env('PORT', '3000'));

export const setupServer = () => {
  const app = express();

  app.use('/uploads', express.static(UPLOAD_DIR));

  app.use(
    express.json({
      type: ['application/json', 'application/vnd.api+json'],
    }),
  );

  const corsOptions = {
    origin: 'https://project-digital-team.vercel.app/',
    credentials: true,
  };

  app.use(cors(corsOptions));
  app.use(cookieParser());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.use('/api-docs', swaggerDocs());

  app.use(router);

  app.use('*', (req, res, next) => {
    res.status(404).json({
      status: 404,
      message: 'Route not found',
    });
  });

  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });
};

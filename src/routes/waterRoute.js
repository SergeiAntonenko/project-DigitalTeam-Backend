import { Router } from 'express';

import {
  addWaterController,
  deleteWaterController,
  updateWaterController,
  getTotalDayWaterController,
  getTotalMonthWaterController,
} from '../controllers/waterController.js';

import {
  checkAllWaterAmountMiddleware,
  checkWaterAmountMiddleware,
  checkIdMiddleware,
} from '../middlewares/waterMiddleware.js';
import { authenticate } from '../middlewares/authenticateUser.js';

const waterRouter = Router();

waterRouter.use(authenticate);

// Додає новий запис води
waterRouter.post('/add', checkWaterAmountMiddleware, addWaterController);

// Оновлює або видаляє запис води за ID
waterRouter
  .route('/:id')
  .patch(checkIdMiddleware, checkWaterAmountMiddleware, updateWaterController)
  .delete(checkIdMiddleware, deleteWaterController);

// Отримання загальних даних води за день і місяць
waterRouter.get(
  '/daily',
  checkAllWaterAmountMiddleware,
  getTotalDayWaterController,
);
waterRouter.get(
  '/monthly',
  checkAllWaterAmountMiddleware,
  getTotalMonthWaterController,
);

export default waterRouter;

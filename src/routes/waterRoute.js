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

const router = Router();

// router.use(authenticate);

// Додає новий запис води на день
router.post('/water/day', checkWaterAmountMiddleware, addWaterController);

// Middleware для перевірки валідності ID
router.use('water/day/:id', checkIdMiddleware);

// Оновлює або видаляє запис води за ID
router
  .route('water/day/:id')
  .put(checkWaterAmountMiddleware, updateWaterController)
  .patch(checkWaterAmountMiddleware, updateWaterController)
  .delete(deleteWaterController);

// Отримання загальних даних води за день і місяць
router.post(
  '/water/day/summary',
  checkAllWaterAmountMiddleware,
  getTotalDayWaterController,
);
router.post(
  '/water/month/summary',
  checkAllWaterAmountMiddleware,
  getTotalMonthWaterController,
);

export { router };

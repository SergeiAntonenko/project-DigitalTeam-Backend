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
} from '../middlewares/waterMiddleware.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = Router();

router.use(authenticate);

// Додає новий запис води
router.post('/water', checkWaterAmountMiddleware, addWaterController);

// Оновлює або видаляє запис води за ID
router
  .route('/water/:userId')
  .patch(checkWaterAmountMiddleware, updateWaterController)
  .delete(deleteWaterController);

// Отримання загальних даних води за день і місяць
router.get(
  '/water/daily',
  checkAllWaterAmountMiddleware,
  getTotalDayWaterController,
);
router.get(
  '/water/monthly',
  checkAllWaterAmountMiddleware,
  getTotalMonthWaterController,
);

export { router };

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

waterRouter.post('/add', checkWaterAmountMiddleware, addWaterController);

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

waterRouter
  .route('/:id')
  .patch(checkIdMiddleware, checkWaterAmountMiddleware, updateWaterController)
  .delete(checkIdMiddleware, deleteWaterController);

export default waterRouter;

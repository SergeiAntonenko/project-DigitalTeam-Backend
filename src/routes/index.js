import { Router } from 'express';
import authRouter from './authUser.js';
import usersRouter from './userRoute.js';
import waterRouter from './waterRoute.js';

const router = Router();
router.use('/users', authRouter);

router.use('/users', usersRouter);

router.use('/water', waterRouter);

export default router;

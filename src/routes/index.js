import { Router } from 'express';
import authRouter from './authUser.js';

const router = Router();
router.use('/users', authRouter);
export default router;

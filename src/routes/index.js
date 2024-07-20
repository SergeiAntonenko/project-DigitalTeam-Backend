import { Router } from 'express';
import authRouter from './authUser.js';

const router = Router();
router.use('/auth', authRouter);

export default router;

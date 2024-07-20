import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { registerUserSchema } from '../validation/authUser.js';
import { registerUserController } from '../controllers/authUser.js';
import { validateBody } from '../middlewares/validateBody.js';

import { loginUserController } from '../controllers/authUser.js';
import { loginUserSchema } from '../validation/authUser.js';

import { logoutUserController } from '../controllers/authUser.js';

import { refreshUserSessionController } from '../controllers/authUser.js';

const router = Router();

router.post(
  '/register',
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController),
);

router.post(
  '/login',
  validateBody(loginUserSchema),
  ctrlWrapper(loginUserController),
);

router.post('/logout', ctrlWrapper(logoutUserController));

router.post('/refresh', ctrlWrapper(refreshUserSessionController));

export default router;

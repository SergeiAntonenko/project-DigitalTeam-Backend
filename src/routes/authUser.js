import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { registerUserSchema } from '../validation/authUser.js';
import { registerUserController } from '../controllers/authUser.js';
import { validateBody } from '../middlewares/validateBody.js';

import { loginUserController } from '../controllers/authUser.js';
import { loginUserSchema } from '../validation/authUser.js';

import { logoutUserController } from '../controllers/authUser.js';

import { refreshUserSessionController } from '../controllers/authUser.js';

const authRouter = Router();

authRouter.post(
  '/register',
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController),
);

authRouter.post(
  '/login',
  validateBody(loginUserSchema),
  ctrlWrapper(loginUserController),
);

authRouter.post('/logout', ctrlWrapper(logoutUserController));

authRouter.post('/refresh', ctrlWrapper(refreshUserSessionController));

export default authRouter;

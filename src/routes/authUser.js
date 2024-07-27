import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { registerUserSchema } from '../validation/authUser.js';
import { registerUserController } from '../controllers/authUser.js';
import { validateBody } from '../middlewares/validateBody.js';

import { loginUserController } from '../controllers/authUser.js';
import { loginUserSchema } from '../validation/authUser.js';

import { logoutUserController } from '../controllers/authUser.js';

import { refreshUserSessionController } from '../controllers/authUser.js';

import { requestResetEmailSchema } from '../validation/authUser.js';
import { requestResetEmailController } from '../controllers/authUser.js';

import { resetPasswordSchema } from '../validation/authUser.js';
import { resetPasswordController } from '../controllers/authUser.js';
import { authenticate } from '../middlewares/authenticateUser.js';

import { getGoogleOAuthUrlController } from '../controllers/authUser.js';

import { loginWithGoogleOAuthSchema } from '../validation/authUser.js';
import { loginWithGoogleController } from '../controllers/authUser.js';

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

authRouter.post('/refresh-token', ctrlWrapper(refreshUserSessionController));

authRouter.post(
  '/send-reset-email',
  validateBody(requestResetEmailSchema),
  ctrlWrapper(requestResetEmailController),
);

authRouter.post(
  '/reset-password',
  validateBody(resetPasswordSchema),
  ctrlWrapper(resetPasswordController),
);

authRouter.get('/get-oauth-url', ctrlWrapper(getGoogleOAuthUrlController));

authRouter.post(
  '/confirm-oauth',
  validateBody(loginWithGoogleOAuthSchema),
  ctrlWrapper(loginWithGoogleController),
);

export default authRouter;

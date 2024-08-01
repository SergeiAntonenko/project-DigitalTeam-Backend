import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  getAllUsersController,
  getUserByIdController,
  updateAvatar,
  updateUserController,
} from '../controllers/userController.js';
import { userValidateBody } from '../middlewares/userValidateBody.js';
import { updateUserSchema } from '../validation/updateUserSchema.js';
import { upload } from '../middlewares/multer.js';
import userValidMongoId from '../middlewares/userValidMongoId.js';
import { authenticate } from '../middlewares/authenticateUser.js';

const usersRouter = Router();

usersRouter.get('/count', ctrlWrapper(getAllUsersController));

usersRouter.get('/current', authenticate, ctrlWrapper(getUserByIdController));

usersRouter.patch(
  '/update',
  authenticate,
  userValidateBody(updateUserSchema),
  ctrlWrapper(updateUserController),
);

usersRouter.patch(
  '/avatar',
  authenticate,
  upload.single('avatar'),
  ctrlWrapper(updateAvatar),
);

usersRouter.use('/:userId', authenticate, userValidMongoId);

export default usersRouter;

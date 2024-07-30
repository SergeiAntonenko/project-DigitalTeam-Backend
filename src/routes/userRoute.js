import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  getAllUsersController,
  getUserByIdController,
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

usersRouter.use('/:userId', authenticate, userValidMongoId);

usersRouter.patch(
  '/update',
  authenticate,
  upload.single('avatar'),
  userValidateBody(updateUserSchema),
  ctrlWrapper(updateUserController),
);

export default usersRouter;

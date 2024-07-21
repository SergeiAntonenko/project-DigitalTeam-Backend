import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  getUserByIdController,
  updateUserController,
} from '../controllers/userController.js';
import { userValidateBody } from '../middlewares/userValidateBody.js';
import { updateUserSchema } from '../validation/updateUserSchema.js';
import { upload } from '../middlewares/multer.js';
import userValidMongoId from '../middlewares/userValidMongoId.js';
import { authenticate } from '../middlewares/authenticateUser.js';

const usersRouter = Router();

usersRouter.use('/:usersId', userValidMongoId);

usersRouter.use('/', authenticate);

usersRouter.get('/:usersId', ctrlWrapper(getUserByIdController));

usersRouter.patch(
  '/:usersId',
  upload.single('avatar'),
  userValidateBody(updateUserSchema),
  ctrlWrapper(updateUserController),
);

export default usersRouter;

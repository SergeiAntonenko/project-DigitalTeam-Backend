import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper';
import {
  getUserByIdController,
  updateUserController,
} from '../controllers/userController';
import { userValidateBody } from '../middlewares/userValidateBody';
import { updateUserShema } from '../validation/updateUserShema';
import { upload } from '../middlewares/multer.js';

const userRouter = Router();

userRouter.get('/user/:userId', ctrlWrapper(getUserByIdController));

userRouter.patch(
  '/user/:userId',
  upload.single('avatar'),
  userValidateBody(updateUserShema),
  ctrlWrapper(updateUserController),
);

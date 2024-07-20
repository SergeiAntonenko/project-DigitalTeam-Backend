import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper';
import { updateUserController } from '../controllers/userController';
import { userValidateBody } from '../middlewares/userValidateBody';
import { updateUserShema } from '../validation/updateUserShema';
import { upload } from '../middlewares/multer.js';

const userRouter = Router();

userRouter.patch(
  '/user/:userId',
  upload.single('photo'),
  userValidateBody(updateUserShema),
  ctrlWrapper(updateUserController),
);

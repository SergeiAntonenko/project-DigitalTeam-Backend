import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper';
import {
  getUserByIdController,
  updateUserController,
} from '../controllers/userController';
import { userValidateBody } from '../middlewares/userValidateBody';
import { updateUserShema } from '../validation/updateUserShema';
import { upload } from '../middlewares/multer.js';
import userValidMongoId from '../middlewares/userValidMongoId.js';
import { authenticate } from '../middlewares/authenticate.js';

const userRouter = Router();

userRouter.use('/user', authenticate);

userRouter
  .route('/user/:userId')
  .use(userValidMongoId)
  .get(ctrlWrapper(getUserByIdController))
  .patch(
    upload.single('avatar'),
    userValidateBody(updateUserShema),
    ctrlWrapper(updateUserController),
  );

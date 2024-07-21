import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper';
import {
  getUserByIdController,
  updateUserController,
} from '../controllers/userController';
import { userValidateBody } from '../middlewares/userValidateBody';
import { updateUserSchema } from '../validation/updateUserSchema.js';
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
    userValidateBody(updateUserSchema),
    ctrlWrapper(updateUserController),
  );

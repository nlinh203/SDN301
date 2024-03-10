import express from 'express';
import { authMiddleware } from '@middleware';
import { changePassword, updateUserInfo } from '@controller';
import { upload } from '@lib/multer';

export const userRouter = express.Router();

userRouter.post('/updateUserInfo', authMiddleware, upload.single('avatar'), updateUserInfo);
userRouter.post('/changePassword', authMiddleware, changePassword);

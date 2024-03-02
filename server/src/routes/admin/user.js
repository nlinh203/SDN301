import { addUser, deleteUser, detailUser, getListUser, updateUser } from '@controller';
import { adminMiddleware } from '@middleware';
import express from 'express';
import { upload } from '@lib/multer';

export const userRouter = express.Router();

userRouter.use(adminMiddleware);
userRouter.get('/getListUser', getListUser);
userRouter.get('/detailUser', detailUser);
userRouter.delete('/deleteUser', deleteUser);
userRouter.post('/addUser', upload.single('avatar'), addUser);
userRouter.post('/updateUser', upload.single('avatar'), updateUser);

import express from 'express';
import { notifyRouter } from './notify';
import { postRouter } from './post';
import { courseRouter } from './course';
import { commentRouter } from './comment';
import { userRouter } from './user';

export const webRouter = express.Router();

webRouter.get('/', (req, res) => {
    res.json('Welcome to coursera replica');
});
webRouter.use('/notify', notifyRouter);
webRouter.use('/post', postRouter);
webRouter.use('/course', courseRouter);
webRouter.use('/comment', commentRouter);
webRouter.use('/user', userRouter);


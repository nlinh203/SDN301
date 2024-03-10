import { authMiddleware } from '@middleware';
import express from 'express';
import { userRouter } from './user';
import { courseRouter } from './course';
import { lessonRouter } from './lesson';
import { questionRouter } from './question';
import { postRouter } from './post';
import { logRouter } from './log.js';
import { courseReviewRouter } from './courseReview.js';
import { commentRouter } from './comment.js';
import { templateRouter } from './template';

export const adminRouter = express.Router();

adminRouter.use(authMiddleware);
adminRouter.use('/user', userRouter);
adminRouter.use('/course', courseRouter);
adminRouter.use('/lesson', lessonRouter);
adminRouter.use('/question', questionRouter);
adminRouter.use('/post', postRouter);
adminRouter.use('/log', logRouter);
adminRouter.use('/courseReview', courseReviewRouter);
adminRouter.use('/comment', commentRouter);
adminRouter.use('/template', templateRouter);

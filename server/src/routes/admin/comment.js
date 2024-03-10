import { getListCommentLesson } from '@controller';
import { staffMiddleware } from '@middleware';
import express from 'express';

export const commentRouter = express.Router();

commentRouter.use(staffMiddleware);
commentRouter.get('/getListCommentLesson', getListCommentLesson);

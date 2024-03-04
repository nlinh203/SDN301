import { getListCourseReview } from '@controller';
import { staffMiddleware } from '@middleware';
import express from 'express';

export const courseReviewRouter = express.Router();

courseReviewRouter.use(staffMiddleware);
courseReviewRouter.get('/getListCourseReview', getListCourseReview);

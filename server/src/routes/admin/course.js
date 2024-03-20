import { addCourse, deleteCourse, detailCourse, getListCourse, updateCourse } from '@controller';
import { staffMiddleware } from '@middleware';
import express from 'express';
import { upload } from '@lib/multer';

export const courseRouter = express.Router();

courseRouter.use(staffMiddleware);
courseRouter.get('/getListCourse', getListCourse);
courseRouter.get('/detailCourse', detailCourse);
courseRouter.delete('/deleteCourse', deleteCourse);
courseRouter.post(
  '/addCourse',
  upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'trailer', maxCount: 1 }
  ]),
  addCourse
);
courseRouter.post(
  '/updateCourse',
  upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'trailer', maxCount: 1 }
  ]),
  updateCourse
);

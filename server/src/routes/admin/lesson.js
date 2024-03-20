import { addLesson, deleteLesson, detailLesson, getListLesson, updateLesson } from '@controller';
import { staffMiddleware } from '@middleware';
import express from 'express';
import { upload } from '@lib/multer';

export const lessonRouter = express.Router();

lessonRouter.use(staffMiddleware);
lessonRouter.get('/getListLesson', getListLesson);
lessonRouter.get('/detailLesson', detailLesson);
lessonRouter.delete('/deleteLesson', deleteLesson);
lessonRouter.post(
  '/addLesson',
  upload.fields([
    { name: 'url', maxCount: 1 },
    { name: 'files', maxCount: 8 }
  ]),
  addLesson
);
lessonRouter.post(
  '/updateLesson',
  upload.fields([
    { name: 'url', maxCount: 1 },
    { name: 'files', maxCount: 8 }
  ]),
  updateLesson
);

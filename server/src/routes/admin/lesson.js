import { addLesson, deleteLesson, detailLesson, getListLesson, updateLesson } from '@controller';
import { staffMiddleware } from '@middleware';
import express from 'express';
import { upload } from '@lib/multer';

export const lessonRouter = express.Router();

lessonRouter.use(staffMiddleware);
lessonRouter.get('/getListLesson', getListLesson);
lessonRouter.get('/detailLesson', detailLesson);
lessonRouter.delete('/deleteLesson', deleteLesson);
lessonRouter.post('/addLesson', upload.array('files'), addLesson);
lessonRouter.post('/updateLesson', upload.array('files'), updateLesson);

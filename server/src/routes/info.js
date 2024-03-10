import express from 'express';
import { getListCourseInfo, getListLessonInfo, getListUserInfo } from '@controller';

export const infoRouter = express.Router();

infoRouter.get('/getListCourseInfo', getListCourseInfo);
infoRouter.get('/getListUserInfo', getListUserInfo);
infoRouter.get('/getListLessonInfo', getListLessonInfo);

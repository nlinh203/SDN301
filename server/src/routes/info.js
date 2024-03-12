import express from 'express';
import { getListCourseInfo, getListLessonInfo, getListUserInfo } from '@controller';

 const infoRouter = express.Router();

infoRouter.get('/getListCourseInfo', getListCourseInfo);
infoRouter.get('/getListUserInfo', getListUserInfo);
infoRouter.get('/getListLessonInfo', getListLessonInfo);
export default infoRouter;
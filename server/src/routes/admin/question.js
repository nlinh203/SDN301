import { addQuestion, deleteQuestion, detailQuestion, exportQuestion, getListQuestion, importQuestion, updateQuestion } from '@controller';
import { staffMiddleware } from '@middleware';
import express from 'express';
import { upload } from '@lib/multer';

export const questionRouter = express.Router();

questionRouter.use(staffMiddleware);
questionRouter.get('/getListQuestion', getListQuestion);
questionRouter.get('/detailQuestion', detailQuestion);
questionRouter.delete('/deleteQuestion', deleteQuestion);
questionRouter.post('/addQuestion', addQuestion);
questionRouter.post('/updateQuestion', updateQuestion);
questionRouter.post('/importQuestion', upload.single('file'), importQuestion);
questionRouter.get('/exportQuestion', exportQuestion);

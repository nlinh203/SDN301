import { addTemplate, deleteTemplate, detailTemplate, getListTemplate, updateTemplate } from '@controller';
import { staffMiddleware } from '@middleware';
import express from 'express';
import { upload } from '@lib/multer';

export const templateRouter = express.Router();

templateRouter.use(staffMiddleware);
templateRouter.get('/getListTemplate', getListTemplate);
templateRouter.get('/detailTemplate', detailTemplate);
templateRouter.delete('/deleteTemplate', deleteTemplate);
templateRouter.post('/addTemplate', upload.array('files'), addTemplate);
templateRouter.post('/updateTemplate', upload.array('files'), updateTemplate);

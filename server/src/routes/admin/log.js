import { getListLog } from '@controller';
import { staffMiddleware } from '@middleware';
import express from 'express';

export const logRouter = express.Router();

logRouter.use(staffMiddleware);
logRouter.get('/getListLog', getListLog);

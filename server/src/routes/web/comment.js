import express from 'express';
import { authMiddleware } from '@middleware';
import { addComment, deleteComment, getListComment } from '@controller';
import { upload } from '@lib/multer';

export const commentRouter = express.Router();

commentRouter.get('/getListComment', getListComment);
commentRouter.post('/addComment', authMiddleware, upload.single('file'), addComment);
commentRouter.post('/deleteComment', authMiddleware, deleteComment);

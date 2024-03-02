import { addPost, deletePost, detailPost, getListPost, updatePost } from '@controller';
import express from 'express';
import { upload } from '@lib/multer';

export const postRouter = express.Router();

postRouter.get('/getListPost', getListPost);
postRouter.get('/detailPost', detailPost);
postRouter.post('/deletePost', deletePost);
postRouter.post('/addPost', upload.single('image'), addPost);
postRouter.post('/updatePost', upload.single('image'), updatePost);

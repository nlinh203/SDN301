import express from 'express';

import { userRouter } from './user';

export const webRouter = express.Router();

webRouter.get('/', (req, res) => {
    res.json('Welcome to coursera replica');
});
webRouter.use('/user', userRouter);
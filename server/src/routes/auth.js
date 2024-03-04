import express from 'express';
import { confirmPassword, getInfo, sendOtpForgotPassword, sendOtpSignup, signIn, signUp } from '@controller';
import { authMiddleware } from '@middleware';

export const authRouter = express.Router();

authRouter.get('/getInfo', authMiddleware, getInfo);
authRouter.post('/signin', signIn);
authRouter.post('/sendOtpSignup', sendOtpSignup);
authRouter.post('/signup', signUp);
authRouter.post('/sendOtpForgotPassword', sendOtpForgotPassword);
authRouter.post('/confirmPassword', confirmPassword);

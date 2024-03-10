import { authRouter } from './auth';
import { adminRouter } from './admin';
import { infoRouter } from './info';
import { webRouter } from './web';

export const routes = (app) => {
  app.use('/auth', authRouter);
  app.use('/admin', adminRouter);
  app.use('/info', infoRouter);
  app.use('/', webRouter);
};

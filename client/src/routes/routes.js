
import { SignIn, SignUp, ForgotPassword } from '@view/auth';
import { Personal} from '@view/web';

const routes = [
  { path: '/auth/signin', element: SignIn, public: true },
  { path: '/auth/signup', element: SignUp, public: true },
  { path: '/auth/forgot-password', element: ForgotPassword, public: true },
  { path: '/personal', element: Personal, layout: 'web', public: true },
];

export default routes;

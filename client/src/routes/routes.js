
import { SignIn, SignUp, ForgotPassword } from '@view/auth';
import { DetailCourseWeb, DetailPostWeb, Home, Learning, MyCourses, MyPosts, Personal, WebCourses, WebPosts } from '@view/web';
import { Courses, Lessons, Questions, Posts, Users, Dashboard, Feedbacks, Log, DetailCourse, DetailLesson, Templates } from '@view/admin';



const routes = [
  { path: '/auth/signin', element: SignIn, public: true },
  { path: '/auth/signup', element: SignUp, public: true },
  { path: '/auth/forgot-password', element: ForgotPassword, public: true },

  { path: '/', element: Home, layout: 'web', public: true },
  { path: '/courses', element: WebCourses, layout: 'web', public: true },
  { path: '/courses/detail/:slug', element: DetailCourseWeb, layout: 'web', public: true },
  { path: '/learning/:slug', element: Learning, layout: 'web', public: true },
  { path: '/courses/my-courses', element: MyCourses, layout: 'web', public: true },
  { path: '/posts', element: WebPosts, layout: 'web', public: true },
  { path: '/posts/detail/:slug', element: DetailPostWeb, layout: 'web', public: true },
  { path: '/posts/my-posts', element: MyPosts, layout: 'web', public: true },
  { path: '/personal', element: Personal, layout: 'web', public: true },

  { path: '/admin', element: Dashboard, layout: 'admin', roles: ['staff', 'admin'] },
  { path: '/admin/courses', element: Courses, layout: 'admin', roles: ['staff', 'admin'] },
  { path: '/admin/courses/insert', element: DetailCourse, layout: 'admin', roles: ['staff', 'admin'] },
  { path: '/admin/courses/detail/:_id', element: DetailCourse, layout: 'admin', roles: ['staff', 'admin'] },
  { path: '/admin/lessons', element: Lessons, layout: 'admin', roles: ['staff', 'admin'] },
  { path: '/admin/lessons/insert', element: DetailLesson, layout: 'admin', roles: ['staff', 'admin'] },
  { path: '/admin/lessons/detail/:_id', element: DetailLesson, layout: 'admin', roles: ['staff', 'admin'] },
  { path: '/admin/questions', element: Questions, layout: 'admin', roles: ['staff', 'admin'] },
  { path: '/admin/posts', element: Posts, layout: 'admin', roles: ['staff', 'admin'] },
  { path: '/admin/feedbacks', element: Feedbacks, layout: 'admin', roles: ['staff', 'admin'] },
  { path: '/admin/log', element: Log, layout: 'admin', roles: ['staff', 'admin'] },
  { path: '/admin/templates', element: Templates, layout: 'admin', roles: ['staff', 'admin'] },
  { path: '/admin/users', element: Users, layout: 'admin', roles: ['admin'] }
];

export default routes;

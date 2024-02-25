import React, { Fragment } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AdminLayout, WebLayout } from '@layout';
import routes from './routes';
import { useAuthContext } from '@context/AuthContext';
import { AccessDenied, ErrorPage } from '@view/auth';

const Router = () => {
  const { userInfo } = useAuthContext();

  return (
    <Routes>
      {routes.map((route, index) => {
        const DefaultLayout = route.layout ? (route.layout === 'admin' ? AdminLayout : WebLayout) : Fragment;
        const Page = route.element;
        const checkPermission = route.roles ? route.roles.includes(userInfo?.role) : true;

        return (
          <Route
            key={index}
            path={route.path}
            element={
              checkPermission ? (
                <DefaultLayout>
                  <Page />
                </DefaultLayout>
              ) : (
                <AccessDenied />
              )
            }
          />
        );
      })}
      <Route path='*' element={<ErrorPage />} />
    </Routes>
  );
};

export default Router;

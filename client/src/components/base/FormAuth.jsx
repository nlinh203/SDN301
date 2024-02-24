import { useAuthContext } from '@context/AuthContext';
import React from 'react';
import { Navigate } from 'react-router-dom';
import { Card } from '.';

const FormAuth = (props) => {
  const { title, subTitle, children } = props;
  const { isAuthenticated } = useAuthContext();

  return (
    <>
      {isAuthenticated ? (
        <Navigate to="/" />
      ) : (
        <section className="h-screen flex justify-center ">
          <div className="h-full px-4 flex justify-center items-center">
            <Card className='flex flex-col w-[416px]'>
              <div className="text-center">
                <h3 className="mt-1 mb-2 pb-1 text-3xl font-semibold">{title}</h3>
                <p className="mb-12 text-md">{subTitle}</p>
              </div>
              {children}
            </Card>
          </div>
        </section>
      )}
    </>
  );
};

export default FormAuth;

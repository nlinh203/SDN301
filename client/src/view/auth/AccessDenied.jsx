import { Button } from '@components/uiCore';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const AccessDenied = () => {
  const navigate = useNavigate();

  return (
    <section className="h-screen flex justify-center">
      <div className="w-full h-full px-4 flex flex-col justify-center items-center">
        <div className="flex flex-col gap-4 w-[300px]">
          <div className="text-center">
            <h3 className="mt-1 mb-2 pb-1 text-4xl font-semibold uppercase text-danger ">Access Denied!</h3>
            <p className="mb-12 text-md">Bạn không có quyền truy cập!</p>
          </div>
          <Button className="w-full" severity="secondary" onClick={() => navigate(-1)}>Quay lại</Button>
          <Button className="w-full" onClick={() => navigate("/auth/signin")}>Đăng nhập</Button>
        </div>
      </div>
    </section>
  );
};

export default AccessDenied;

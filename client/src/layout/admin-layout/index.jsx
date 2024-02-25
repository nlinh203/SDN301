import React, { useState } from 'react';
import TopBar from './top-bar';
import Sidebar from './side-bar';
import { INITIAL_USER_INFO, useAuthContext } from '@context/AuthContext';
import { useToastState } from '@store';
import { useNavigate } from 'react-router-dom';

const AdminLayout = ({ children }) => {
  const navigate = useNavigate();
  const [isShow, setIsShow] = useState(true);
  const { setUserInfo, setIsAuthenticated } = useAuthContext();
  const { showToast } = useToastState();

  const onSignOut = () => {
    setUserInfo(INITIAL_USER_INFO);
    setIsAuthenticated(false);
    localStorage.removeItem('token');
    showToast({ title: 'Đăng xuất thành công', severity: 'success' });
    navigate('/');
  };

  return (
    <div className="m-0 antialiased font-normal dark:bg-slate-900 text-base leading-default text-slate-500">
      <TopBar isShow={isShow} setIsShow={setIsShow} onSignOut={onSignOut} />
      <div className="-z-10 fixed min-h-48 w-full top-0 bg-cover" style={{ backgroundImage: `url(${'/images/background.jpg'})`}}>
        <span className="fixed top-0 left-0 w-full min-h-48 bg-blue-500 opacity-40"></span>
      </div>
      <Sidebar isShow={isShow} setIsShow={setIsShow} onSignOut={onSignOut} />
      <div className={`transition-all duration-500 ease-in-out p-6 mt-20 z-10 ${isShow ? 'ml-64' : 'ml-20'}`}>{children}</div>
    </div>
  );
};

export default AdminLayout;

import { INITIAL_USER_INFO, useAuthContext } from '@context/AuthContext';
import React, { useEffect, useState } from 'react';
import SearchSection from './SearchSection';
import AvatarSection from '@layout/admin-layout/top-bar/AvatarSection';
import { Button, Link } from '@components/uiCore';
import { useLocation, useNavigate } from 'react-router-dom';
import { useToastState } from '@store';
import Footer from './Footer';
import { items } from './items';
import NotifySection from '@layout/admin-layout/top-bar/notify-section';
import { BiSolidNews } from 'react-icons/bi';
import News from './News';
import { getListNewsApi } from '@api';
import { useInfinityApi } from '@lib/react-query';

const WebLayout = ({ children }) => {
  const navigate = useNavigate();
  const { isAuthenticated, setUserInfo, setIsAuthenticated } = useAuthContext();
  const { showToast } = useToastState();
  const { pathname } = useLocation();
  const [select, setSelect] = useState(null);
  const [show, setShow] = useState(true);
  const [news, setNews] = useState([]);
  const { data, fetchNextPage, hasNextPage } = useInfinityApi((params) => getListNewsApi(params), 'news', 10);

  useEffect(() => {
    if (data?.pages) {
      let newData = [];
      data.pages.forEach((d) => {
        const documents = d?.documents;
        if (Array.isArray(documents)) newData = [...newData, ...documents];
      });
      setNews(newData);
    }
  }, [data]);

  const onSignOut = () => {
    setUserInfo(INITIAL_USER_INFO);
    setIsAuthenticated(false);
    localStorage.removeItem('token');
    showToast({ title: 'Đăng xuất thành công', severity: 'success' });
  };

  useEffect(() => {
    const item = pathname !== '/' ? items.find((i) => i.route !== '/' && pathname.includes(i.route)) : { route: '/', label: 'Trang chủ' };
    if (item) {
      setSelect(item.route);
      document.title = item.label;
    }
  }, [pathname]);

  return (
    <div className="antialiased font-normal text-base text-slate-500 transition-all duration-500 ease-in-out ">
      <div className="fixed inset-x-0 top-0 z-20 h-16 flex justify-between items-center px-4 bg-white shadow-[0_4px_12px_0_rgba(0,0,0,0.07),_0_2px_4px_rgba(0,0,0,0.05)]">
        <div className="flex gap-8 items-center uppercase font-bold">
          <Link to="/">
            <h2 className="text-xl">Coursera replica</h2>
          </Link>
          <div className="flex gap-4 text-sm">
            {items.map((item, index) => (
              <Link to={item.route} key={index}>
                <h2 className={select === item.route ? '' : 'text-slate-500'}>{item.label}</h2>
              </Link>
            ))}
          </div>
        </div>
        <SearchSection />
        {isAuthenticated ? (
          <div className="flex gap-4 items-center">
            <NotifySection />
            <AvatarSection mode="web" onSignOut={onSignOut} />
          </div>
        ) : (
          <Button onClick={() => navigate('/auth/signin')}>Đăng nhập</Button>
        )}
      </div>
      <div className="mx-24">
        <div className="container mt-16 mx-auto min-h-screen">{children}</div>
      </div>
      <Footer />
      <div className="fixed bottom-4 left-4">
        <Button severity="danger" onClick={() => setShow(true)}>
          <BiSolidNews size={20} /> Tin tức ({news?.length})
        </Button>
      </div>
      <News news={news} show={show} setShow={setShow} />
    </div>
  );
};

export default WebLayout;

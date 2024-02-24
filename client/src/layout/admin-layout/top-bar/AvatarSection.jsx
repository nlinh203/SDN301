import { Button, Hr } from '@components/uiCore';
import React, { useEffect, useRef, useState } from 'react';
import { TERipple } from 'tw-elements-react';
import { BiLogOut } from 'react-icons/bi';
import { IoNavigateOutline } from 'react-icons/io5';
import { useAuthContext } from '@context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { BiUserCircle } from 'react-icons/bi';
import { BiBookBookmark } from 'react-icons/bi';
import { BiCalendarHeart } from 'react-icons/bi';

const items = [
  { label: 'Thông tin cá nhân', icon: BiUserCircle, route: '/personal' },
  { label: 'Khóa học đã đăng ký', icon: BiBookBookmark, route: '/courses/my-courses' },
  { label: 'Bài viết của tôi', icon: BiCalendarHeart, route: '/posts/my-posts' }
];

const AvatarSection = ({ onSignOut, mode = 'admin' }) => {
  const { userInfo } = useAuthContext();
  const ref = useRef(null);
  const [isShow, setIsShow] = useState(false);
  const navigate = useNavigate();

  const handleClickOutside = (e) => {
    if (ref.current && !ref.current.contains(e.target)) setIsShow(false);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={ref} className="relative items-center">
      <div onClick={() => setIsShow(!isShow)} className="p-1 rounded-md shadow-xl">
        <div
          className={`relative cursor-pointer h-10 w-10 rounded-md bg-cover`}
          style={{ backgroundImage: `url(${userInfo.avatar || '/images/avatar.jpg'})` }}
        >
          <span className="absolute top-0 left-0 w-full h-full bg-primary-500 opacity-10"></span>
        </div>
      </div>
      <div
        className={`absolute right-0 mt-2 w-80 bg-white shadow-xl rounded-sm transition-all z-50 text-slate-500 px-4
          duration-300 ease-in-out transform ${isShow ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0 pointer-events-none'}`}
      >
        <div className="flex h-24 items-center">
          <div className="w-5/12 items-center flex justify-center">
            <div
              className="relative h-16 w-16 rounded-md bg-cover"
              style={{ backgroundImage: `url(${userInfo.avatar || '/images/avatar.jpg'})` }}
            ></div>
          </div>
          <div className="w-7/12 items-center text-left">
            <h4 className="font-medium">{userInfo?.fullName}</h4>
            <p className="text-sm">@{userInfo?.username}</p>
          </div>
        </div>
        <ul className="relative list-none">
          <Hr />
          {items.map((item, index) => (
            <li key={index}>
              <TERipple className="w-full" rippleColor="light">
                <Link
                  to={item.route}
                  className={`flex h-12 cursor-pointer items-center truncate rounded-sm px-5 py-2 text-sm
                   outline-none transition duration-300 ease-in-out hover:bg-primary-100 hover:text-primary
                  hover:outline-none gap-4 my-1`}
                >
                  {item.icon && <item.icon size={20} />}
                  <span>{item.label}</span>
                </Link>
              </TERipple>
              <Hr />
            </li>
          ))}
        </ul>
        <div className="flex flex-col gap-2 my-4">
          {['staff', 'admin'].includes(userInfo?.role) && (
            <Button
              onClick={() => navigate(mode === 'admin' ? '/' : '/admin')}
              className={`w-full flex gap-2 truncate`}
              severity="secondary"
            >
              <IoNavigateOutline size={16} />
              <span>{mode === 'admin' ? 'Chuyển đến trang chủ' : 'Chuyển đến trang admin'}</span>
            </Button>
          )}
          <Button onClick={() => onSignOut()} className={`w-full flex gap-2 truncate`}>
            <BiLogOut size={16} />
            <span>Đăng xuất</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AvatarSection;

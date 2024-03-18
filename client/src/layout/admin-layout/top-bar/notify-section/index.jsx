import { getListNotifyApi, readAllNotifyApi } from '@api';
import { Hr } from '@components/uiCore';
import React, { useEffect, useRef, useState } from 'react';
import { MdOutlineNotificationsActive } from 'react-icons/md';
import Notify from './Notify';
import { TETabs, TETabsContent, TETabsItem, TETabsPane } from 'tw-elements-react';
import { useGetApi } from '@lib/react-query';
import { socket } from '@lib/socket-io';
import { useAuthContext } from '@context/AuthContext';
import { useToastState } from '@store';

const NotifySection = () => {
  const ref = useRef(null);
  const { showToast } = useToastState();
  const { userInfo } = useAuthContext();
  const [isShow, setIsShow] = useState(false);
  const [render, setRender] = useState(false);
  const [buttonActive, setButtonActive] = useState('tab1');
  const { data } = useGetApi(getListNotifyApi, { page: 1, limit: 1, status: 0, render }, 'initNotify');
  const isReadAll = data?.documents?.length > 0;

  const handleButtonClick = (value) => {
    if (value !== buttonActive) setButtonActive(value);
  };

  const handleClickOutside = (e) => {
    if (ref.current && !ref.current.contains(e.target)) setIsShow(false);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const onReadAll = async (status) => {
    const response = await readAllNotifyApi({ status });
    if (response) setRender((pre) => !pre);
  };

  useEffect(() => {
    if (userInfo?._id) {
      const key = `notifies_${userInfo?._id}`;
      function onConnect() {
        console.log('Connecting...');
      }

      function onDisconnect(reason) {
        console.log('Disconnecting...', reason);
      }

      function onEvent(event) {
        console.log(event);
        showToast({ title: `${event?.fullName ? `${event?.fullName} ${event?.mess}` : event?.mess}`, severity: 'info' });
        setRender((pre) => !pre);
      }

      socket.on('connect', onConnect);
      socket.on('disconnect', onDisconnect);
      socket.on(key, onEvent);

      return () => {
        socket.off('connect', onConnect);
        socket.off('disconnect', onDisconnect);
        socket.off(key, onEvent);
      };
    }
  }, [userInfo?._id]);

  return (
    <div ref={ref} className="relative items-center">
      <button
        onClick={() => {
          setIsShow(!isShow);
          if (isReadAll) onReadAll(1);
        }}
        className={`hover:bg-primary hover:text-white p-2 rounded-md hover:shadow-xl ${isShow ? 'bg-primary text-white shadow-xl' : 'bg-primary-200 text-primary shadow-md'}`}
      >
        <div className="relative">
          <MdOutlineNotificationsActive size={20} />
          {isReadAll && <span className="absolute top-0 right-0 block h-2 w-2 rounded-full ring-1 ring-primary-50 bg-red-400" />}
        </div>
      </button>
      <div
        className={`absolute right-0 mt-2 w-80 bg-white shadow-xl rounded-sm transition-all z-50
          duration-300 ease-in-out transform ${isShow ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0 pointer-events-none'}`}
      >
        <div className="mx-4">
          <div className="flex justify-between items-center h-16 mb-0">
            <h4 className="text-md font-semibold text-gray-900">All Notification</h4>
            <span onClick={() => onReadAll(2)} className="text-xs text-blue-600 cursor-pointer hover:text-blue-800">
              Mark all as read
            </span>
          </div>
        </div>
        <Hr />
        <TETabs theme={{ defaultTabs: 'mb-0 flex list-none flex-row flex-wrap border-b-0 pl-0' }}>
          <TETabsItem onClick={() => handleButtonClick('tab1')} active={buttonActive === 'tab1'} tag="div">
            Tất cả
          </TETabsItem>
          <TETabsItem onClick={() => handleButtonClick('tab2')} active={buttonActive === 'tab2'} tag="div">
            Chưa đọc
          </TETabsItem>
        </TETabs>
        <TETabsContent>
          <TETabsPane show={buttonActive === 'tab1'}>
            <Notify render={render} setRender={setRender} />
          </TETabsPane>
          <TETabsPane show={buttonActive === 'tab2'}>
            <Notify render={render} setRender={setRender} status={1} />
          </TETabsPane>
        </TETabsContent>
      </div>
    </div>
  );
};

export default NotifySection;

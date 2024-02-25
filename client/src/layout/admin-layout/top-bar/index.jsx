import React from 'react';
import AvatarSection from './AvatarSection';
import NotifySection from './notify-section';

const TopBar = (props) => {
  const { isShow, setIsShow, onSignOut } = props;

  return (
    <div className="fixed top-0 inset-x-0 text-white z-20">
      <div className={`transition-all duration-500 ease-in-out h-16 p-6 ${isShow ? 'ml-64' : 'ml-20'}`}>
        <div className="flex items-center w-full h-full justify-end">
          <div className="flex gap-4 items-center">
            <NotifySection />
            <AvatarSection mode='admin' onSignOut={onSignOut} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;

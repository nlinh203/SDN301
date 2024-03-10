import { Hr, Switch } from '@components/uiCore';
import React from 'react';

const Setting = () => {
  return (
    <div className="flex flex-col gap-2 w-full px-8">
      <h2 className="uppercase font-semibold text-left p-2">Gửi mail khi có:</h2>
      <Hr />
      <div className="card my-2 flex flex-col gap-4">
        <div className="flex justify-between">
          <p>Bài học mới</p>
          <Switch />
        </div>
        <Hr />
      </div>
      <h2 className="uppercase font-semibold text-left p-2">Gửi thông báo khi có:</h2>
      <Hr />
      <div className="card my-2 flex flex-col gap-4">
        <div className="flex justify-between">
          <p>Nhắc đến bạn trong bình luận</p>
          <Switch />
        </div>
        <Hr />
        <div className="flex justify-between">
          <p>Trả lời trong bình luận</p>
          <Switch />
        </div>
        <Hr />
        <div className="flex justify-between">
          <p>Bình luận trong bài viết</p>
          <Switch />
        </div>
        <Hr />
      </div>
    </div>
  );
};

export default Setting;

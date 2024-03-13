import { RoleTitle } from '@components/base';
import { Button, Link } from '@components/uiCore';
import React, { useState } from 'react';

const PostCard = ({ item }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div className="my-4">
      <div className="relative h-48 px-2 overflow-hidden" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        <div className="h-full flex justify-center items-center">
          <div className="relative h-full w-full rounded-lg bg-cover bg-slate-100" style={{ backgroundImage: `url('${item.image}')` }}>
            <span className="absolute top-0 left-0 w-full h-full rounded-lg bg-primary-500 opacity-20"></span>
          </div>
        </div>
        <div className={`absolute rounded-md mx-2 inset-0 justify-center items-center group-hover:flex flex`}>
          {isHovered && <div className="absolute rounded-md inset-0 bg-black bg-opacity-10 opacity-30"></div>}
          <Link
            to={`/posts/detail/${item.slug}`}
            className={`font-medium z-10 duration-300 ease-in-out transform 
            ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
          >
            <Button severity="secondary" label="Xem bài viết" />
          </Link>
        </div>
      </div>
      <div className="mt-2 px-4 flex flex-col gap-2">
        <h4 className="font-medium line-clamp-2">{item.title}</h4>
        <div className="flex gap-2 items-center text-sm">
          <div className="h-6 w-6">
            <div
              className="h-6 w-6 rounded-full bg-slate-100 bg-cover"
              style={{ backgroundImage: `url('${item.by?.avatar || '/images/avatar.jpg'}')` }}
            ></div>
          </div>
          {RoleTitle(item?.by?.fullName, item?.by?.role, 16)}
          <span>•</span>
          <span className="!text-xs">{item.time || 0} phút đọc</span>
        </div>
      </div>
    </div>
  );
};

export default PostCard;

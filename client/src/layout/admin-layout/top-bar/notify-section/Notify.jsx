import React, { useEffect, useState } from 'react';
import { multiFormatDateString } from '@utils';
import { Link, useNavigate } from 'react-router-dom';
import { TERipple } from 'tw-elements-react';
import { Button, Hr } from '@components/uiCore';
import { RoleTitle } from '@components/base';
import { BiSolidCheckCircle } from 'react-icons/bi';
import {notifies} from "../../../../data";

const Notify = ({ status, render, setRender }) => {
  const navigate = useNavigate();

  const onClickNoti = async (item) => {
      switch (item.type) {
        case 1:
          return navigate(`/posts/detail/${item?.data?.slug}`);
        case 2:
          return navigate(`/posts/detail/${item?.data?.slug}#${item?.data?._id}`);
        case 3:
          return navigate(`/posts/detail/${item?.data?.slug}#${item?.data?._id}`);
        case 4:
          return navigate(`/courses/my-courses`);
        case 5:
          return navigate(`/learning/${item?.data?.slug}?id=${item?.objectId}`);
        case 6:
          return navigate(`/learning/${item?.data?.slug}?id=${item?.objectId}`);
      }
  };

  return notifies?.length > 0 ? (
    <>
      <div className="overflow-y-auto max-h-[60vh] text-gray-600">
        <ul className="relative list-none">
          <Hr />
          {notifies?.map((item, index) => (
            <li key={index}>
              <TERipple className="w-full" rippleColor="light">
                <Link
                  onClick={() => onClickNoti(item)}
                  className={`flex cursor-pointer rounded-sm px-4 py-2 ${[0, 1].includes(item.status) ? 'bg-primary-50' : ''}
                      text-sm hover:bg-primary-100 hover:text-primaryhover:outline-none gap-4`}
                >
                  <div className="h-12 w-12">
                    <div
                      className="h-12 w-12 rounded-full bg-black bg-cover"
                      style={{ backgroundImage: `url('${item?.by?.avatar || '/images/avatar.jpg'}')` }}
                    ></div>
                  </div>
                  <div className="flex flex-col gap-1">
                    {RoleTitle(item?.by?.fullName, item?.by?.role, 16) || (
                      <span className="flex gap-1 items-center">
                        <span className="font-medium">Hệ thống</span>
                        <BiSolidCheckCircle size={16} className="text-primary" />
                      </span>
                    )}
                    <span>{item?.content}</span>
                    <span className="text-xs text-primary">{multiFormatDateString(item.createdAt)}</span>
                  </div>
                </Link>
              </TERipple>
              <Hr />
            </li>
          ))}
        </ul>
      </div>
      <Hr />
      <div className="h-8 items-center flex justify-center mt-2">
        <Button label="Xem thêm" severity="secondary" className="!px-4 !py-2" disabled={false} onClick={() => {}} />
      </div>
    </>
  ) : (
    <>
      <Hr />
      <div className="h-16 text-gray-600 flex justify-center items-center mt-2">
        <h5 className="font-medium">Bạn không có thông báo nào.</h5>
      </div>
    </>
  );
};

export default Notify;

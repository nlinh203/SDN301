import { Hr } from '@components/uiCore';
import React, { useState } from 'react';
import Post from './Post';
import { Pagination } from '@components/base';
import { useGetApi } from '@lib/react-query';
import { getListPostWebApi } from '@api';
import { useGetParams } from '@hook';
import Search from './Search';

const WebPosts = () => {
  const initParams = useGetParams();
  const [params, setParams] = useState(initParams);
  const [render, setRender] = useState(false);
  const { data } = useGetApi(getListPostWebApi, { ...params, render }, 'posts');

  return (
    <div className="mt-24 flex p-4">
      <div className="lg:w-full xl:w-8/12 flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <h2 className="uppercase font-semibold text-left">Danh sách bài viết</h2>
          <div className="w-[400px]">
            <Search params={params} setParams={setParams} />
          </div>
        </div>
        <Hr />
        {data?.documents?.length > 0 ? (
          data.documents.map((item, index) => <Post key={index} item={item} setRender={setRender} />)
        ) : (
          <div className="p-4 font-medium text-lg">Chưa có bài viết nào được tạo!</div>
        )}
        <Hr />
        <div className="flex justify-center my-4">
          <Pagination totalRecord={data?.total} params={params} setParams={setParams} />
        </div>
      </div>
    </div>
  );
};

export default WebPosts;

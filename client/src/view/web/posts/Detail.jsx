import { detailPostWebApi, getInfoApi, getListCommentApi, likePostApi, savePostApi } from '@api';
import { Comments } from '@components/extend';
import { Hr } from '@components/uiCore';
import { useGetApi } from '@lib/react-query';
import moment from 'moment';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BiBookmark, BiSolidBookmark, BiSolidHeart } from 'react-icons/bi';
import { BiHeart } from 'react-icons/bi';
import { useConfirmState } from '@store';
import { useAuthContext } from '@context/AuthContext';
import { RoleTitle } from '@components/base';

const DetailPostWeb = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const { userInfo, isAuthenticated, setUserInfo } = useAuthContext();
  const { showConfirm } = useConfirmState();
  const [render, setRender] = useState(false);
  const [renderComment, setRenderComment] = useState(false);
  const { data } = useGetApi(detailPostWebApi, { slug, render }, 'post');
  const { data: comments } = useGetApi(getListCommentApi, { objectId: data?._id, type: 1, render: renderComment }, 'comments', Boolean(data?._id));

  const onWarning = async () => {
    showConfirm({
      title: 'Vui lòng đăng nhập để tiếp tục!',
      action: () => navigate('/auth/signin')
    });
  };

  const onLikePost = async () => {
    if (!isAuthenticated) return onWarning();
    const response = await likePostApi({ _id: data?._id });
    if (response) setRender((pre) => !pre);
  };

  const onSavePost = async () => {
    if (!isAuthenticated) return onWarning();
    const response = await savePostApi({ _id: data?._id });
    if (response) {
      const response = await getInfoApi();
      if (response) {
        setUserInfo(response);
        setRender((pre) => !pre);
      } else localStorage.removeItem('token');
    }
  };

  return (
    <div className="mt-24 flex flex-wrap">
      <div className="sm:w-full lg:w-8/12 text-left p-4">
        <div className="flex flex-col gap-6 px-2">
          <h1 className="text-xl uppercase font-semibold">{data?.title}</h1>
          <span>{data?.description}</span>
          <Hr />
          <div className="flex gap-4 mb-2 items-center">
            <div className="w-12 h-12">
              <div
                className="h-12 w-12 rounded-full bg-primary-100 bg-cover"
                style={{ backgroundImage: `url('${data?.by?.avatar || '/images/avatar.jpg'}')` }}
              ></div>
            </div>
            <div className="flex justify-between items-center w-full">
              <div className="flex flex-col gap-1 text-sm">
                {RoleTitle(data?.by?.fullName, data?.by?.role, 16)}
                <div className="flex gap-2">
                  <span>{data?.createdAt ? moment(data.createdAt).format('DD/MM/YYYY HH:mm:ss') : ''}</span>
                  <span>•</span>
                  <span>{data?.time} phút đọc</span>
                </div>
              </div>
              <div className="flex gap-2 justify-end px-2 pb-2 items-center">
                <div onClick={() => onLikePost()} className="cursor-pointer">
                  {data?.likes?.includes(userInfo?._id) ? (
                    <BiSolidHeart size={20} className="text-red-600" />
                  ) : (
                    <BiHeart size={20} className="hover:text-red-600" />
                  )}
                </div>
                <span>{data?.likes?.length}</span>
                {!Boolean(userInfo?.posts?.find((s) => s._id === data?._id)) && (
                  <div onClick={() => onSavePost()} className="cursor-pointer">
                    {Boolean(userInfo?.saves?.find((s) => s._id === data?._id)) ? (
                      <BiSolidBookmark size={20} className="text-primary-600" />
                    ) : (
                      <BiBookmark size={20} className="hover:text-primary-600" />
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
          <Hr />
          <h2 className="uppercase font-semibold">Nội dung bài viết</h2>
          <div className="card overflow-scroll">
            <div dangerouslySetInnerHTML={{ __html: data?.content }} />
          </div>
        </div>
      </div>
      <div className="sm:w-full lg:w-4/12 p-4">
        <div className="flex flex-col gap-6 px-2">
          <div className="flex flex-col items-center justify-center my-8">
            <div className="relative h-60 w-10/12 rounded-lg bg-cover" style={{ backgroundImage: `url('${data?.image}')` }}>
              <span className="absolute top-0 left-0 w-full rounded-lg h-full bg-primary-500 opacity-15"></span>
            </div>
          </div>
        </div>
        <Comments title='Bình luận trong bài viết' objectId={data?._id} comments={comments} setRender={setRenderComment} type={1} />
      </div>
    </div>
  );
};

export default DetailPostWeb;

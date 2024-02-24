import { Hr, Link } from '@components/uiCore';
import { BiBookmark } from 'react-icons/bi';
import { BiSolidBookmark } from 'react-icons/bi';
import { BiHeart } from 'react-icons/bi';
import { BiSolidHeart } from 'react-icons/bi';
import { BiSolidEdit } from 'react-icons/bi';
import { BiSolidTrash } from 'react-icons/bi';
import React from 'react';
import { multiFormatDateString } from '@utils';
import { useNavigate } from 'react-router-dom';
import { useConfirmState } from '@store';
import { useAuthContext } from '@context/AuthContext';
import { deletePostApi, getInfoApi, likePostApi, savePostApi } from '@api';
import { RoleTitle } from '@components/base';

const Post = ({ item, type, setRender = () => {}, setShow = () => {} }) => {
  const navigate = useNavigate();
  const { showConfirm } = useConfirmState();
  const { userInfo, isAuthenticated, setUserInfo } = useAuthContext();

  const onWarning = async () => {
    showConfirm({
      title: 'Vui lòng đăng nhập để tiếp tục!',
      action: () => navigate('/auth/signin')
    });
  };

  const onLikePost = async () => {
    if (!isAuthenticated) return onWarning();
    const response = await likePostApi({ _id: item._id });
    if (response) {
      setRender((pre) => !pre);
      if (type === 'mine') {
        const response = await getInfoApi();
        if (response) {
          setUserInfo(response);
        } else localStorage.removeItem('token');
      }
    }
  };

  const onSavePost = async () => {
    if (!isAuthenticated) return onWarning();
    const response = await savePostApi({ _id: item._id });
    if (response) {
      const response = await getInfoApi();
      if (response) {
        setUserInfo(response);
        setRender((pre) => !pre);
      } else localStorage.removeItem('token');
    }
  };

  const onDelete = async () => {
    if (!userInfo?._id) return onWarning();
    const response = await deletePostApi({ _id: item._id });
    if (response) {
      const response = await getInfoApi();
      if (response) {
        setUserInfo(response);
      } else localStorage.removeItem('token');
    }
  };

  return (
    <div className="card my-2 flex gap-2 text-sm">
      <div className="w-full p-2 text-left flex flex-col gap-2">
        <div className="flex gap-4 mb-2 items-center">
          <div className="h-10 w-10">
            <div
              className="h-10 w-10 rounded-full bg-black bg-cover"
              style={{ backgroundImage: `url('${item?.by?.avatar || '/images/avatar.jpg'}')` }}
            ></div>
          </div>
          <div className="flex flex-col gap-1">
            {RoleTitle(item?.by?.fullName, item?.by?.role, 16)}
            <div className="flex gap-2">
              <span>{multiFormatDateString(item.createdAt)}</span>
              <span>•</span>
              <span>{item.time} phút đọc</span>
            </div>
          </div>
        </div>
        <Hr />
        <Link to={`/posts/detail/${item.slug}`} className="!text-lg font-semibold">
          {item.title}
        </Link>
        <span>{item.description}</span>
        <div className="flex gap-2 items-center">
          {item?.hashtag?.length > 0 &&
            item.hashtag.map((h, index) => (
              <p key={index} className="py-1 px-2 rounded-md bg-primary-100">
                {h}
              </p>
            ))}
        </div>
      </div>
      <div className="w-[400px] p-2">
        <div className="flex gap-3 justify-end px-2 pb-4 items-center">
          <div onClick={() => onLikePost()} className="cursor-pointer">
            {item?.likes?.includes(userInfo?._id) ? (
              <BiSolidHeart size={20} className="text-red-600" />
            ) : (
              <BiHeart size={20} className="hover:text-red-600" />
            )}
          </div>
          <span>{item?.likes?.length}</span>
          {!Boolean(userInfo?.posts?.find((s) => s._id === item?._id)) ? (
            <div onClick={() => onSavePost()} className="cursor-pointer">
              {Boolean(userInfo?.saves?.find((s) => s._id === item?._id)) ? (
                <BiSolidBookmark size={20} className="text-primary-600" />
              ) : (
                <BiBookmark size={20} className="hover:text-primary-600" />
              )}
            </div>
          ) : (
            <>
              <BiSolidEdit onClick={() => setShow(item._id)} size={20} className="hover:text-primary-600 cursor-pointer" />
              <BiSolidTrash onClick={onDelete} size={20} className="hover:text-primary-600 cursor-pointer" />
            </>
          )}
        </div>
        <Link to={`/posts/detail/${item.slug}`}>
          <div className="relative h-[150px] w-full rounded-md bg-cover" style={{ backgroundImage: `url('${item.image}')` }}>
            <span className="absolute top-0 left-0 w-full h-full rounded-md bg-primary-500 opacity-20"></span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Post;

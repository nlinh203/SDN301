import { Button, Hr } from '@components/uiCore';
import React, { useState } from 'react';
import Post from './Post';
import { TETabs, TETabsContent, TETabsItem, TETabsPane } from 'tw-elements-react';
import { useAuthContext } from '@context/AuthContext';
import DetailPost from '@view/admin/posts/Detail';
import { useNavigate } from 'react-router-dom';

const MyPosts = () => {
  const navigate = useNavigate()
  const { userInfo } = useAuthContext();
  const [buttonActive, setButtonActive] = useState('tab1');
  const [show, setShow] = useState(false);

  const handleButtonClick = (value) => {
    if (value === buttonActive) {
      return;
    }
    setButtonActive(value);
  };

  return (
    <div className="mt-24 flex">
      <DetailPost show={show} setShow={setShow} data={userInfo?.posts} />
      <div className="lg:w-full xl:w-8/12 flex flex-col">
        <TETabs>
          <TETabsItem onClick={() => handleButtonClick('tab1')} active={buttonActive === 'tab1'} tag="button">
            Bài viết đã đăng
          </TETabsItem>
          <TETabsItem onClick={() => handleButtonClick('tab2')} active={buttonActive === 'tab1'} tag="button">
            Bài viết chờ duyệt
          </TETabsItem>
          <TETabsItem onClick={() => handleButtonClick('tab3')} active={buttonActive === 'tab2'} tag="button">
            Bài viết đã lưu
          </TETabsItem>
        </TETabs>
        <TETabsContent>
          <TETabsPane show={buttonActive === 'tab1'}>
            <div className="flex flex-col gap-2">
              <Hr />
              {userInfo?.posts?.length > 0 ? (
                userInfo.posts.filter(p => p.status === 0).map((item, index) => <Post key={index} item={item} type="mine" setShow={setShow} />)
              ) : (
                <span className='mt-4 px-8'>Bạn chưa đăng bài viết nào.</span>
              )}
              <div className="flex justify-center mb-2">
                <Button onClick={() => setShow(true)} label="Thêm bài viết" />
              </div>
              <Hr />
            </div>
          </TETabsPane>
          <TETabsPane show={buttonActive === 'tab2'}>
            <div className="flex flex-col gap-2">
              <Hr />
              {userInfo?.posts?.length > 0 ? (
                userInfo.posts.filter(p => p.status === 0).map((item, index) => <Post key={index} item={item} type="mine" setShow={setShow} />)
              ) : (
                <span className='mt-4 px-8'>Bạn chưa đăng bài viết nào.</span>
              )}
              <div className="flex justify-center mb-2">
                <Button onClick={() => setShow(true)} label="Thêm bài viết" />
              </div>
              <Hr />
            </div>
          </TETabsPane>
          <TETabsPane show={buttonActive === 'tab3'}>
            <div className="flex flex-col gap-2">
              <Hr />
              {userInfo?.saves?.length > 0 ? (
                userInfo.saves.map((item, index) => <Post key={index} item={item} type="mine" />)
              ) : (
                <span className='mt-4 px-8'>Bạn chưa lưu bài viết nào.</span>
              )}
              <div className="flex justify-center mb-2">
                <Button onClick={() => navigate('/posts')} label="Xem tất cả bài viết" />
              </div>
              <Hr />
            </div>
          </TETabsPane>
        </TETabsContent>
      </div>
    </div>
  );
};

export default MyPosts;

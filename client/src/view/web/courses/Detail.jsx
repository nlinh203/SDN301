import { Button, Hr, Modal } from '@components/uiCore';
import { FaCrown } from 'react-icons/fa';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { detailCourseWebApi, getInfoApi, registerCourseApi } from '@api';
import { useGetApi } from '@lib/react-query';
import { BiCheck } from 'react-icons/bi';
import Reviews from './Reviews';
import { useConfirmState, useToastState } from '@store';
import { useAuthContext } from '@context/AuthContext';
import { formatMinuteStringV1, formatMinuteStringV2, formatNumber } from '@utils';
import ReactPlayer from 'react-player';

const DetailCourseWeb = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const { userInfo, isAuthenticated, setUserInfo } = useAuthContext();
  const { showToast } = useToastState();
  const { showConfirm } = useConfirmState();
  const [show, setShow] = useState(false);
  const [showz, setShowz] = useState(false);
  const [render, setRender] = useState(false);
  const { data } = useGetApi(detailCourseWebApi, { slug, render }, 'course');
  const reviews = data?.reviews;
  const check = reviews && Array.isArray(reviews) ? !Boolean(reviews.find((r) => r.by._id === userInfo._id)) : true;
  const [isHovered, setIsHovered] = useState(false);

  const onWarning = async () => {
    showConfirm({
      title: 'Vui lòng đăng nhập để có thể tiếp tục!',
      action: () => navigate('/auth/signin')
    });
  };

  const onRegister = async () => {
    if (!isAuthenticated) return onWarning();
    const price = data.price - data.sale;
    const title =
      price > 0
        ? `Khóa học "${data?.name}" sẽ cần phải thanh toán ${formatNumber(price)} VNĐ, bạn có muốn tiếp tục đăng ký?`
        : `Bạn có chắc chắn muốn đăng ký khóa học "${data?.name}"`;
    const title2 = price > 0 ? 'Để xác nhận đăng ký khóa học, vui lòng thanh toán và chờ hệ thống xử lý!' : 'Đăng ký khóa học thành công!';
    showConfirm({
      title,
      action: async () => {
        const response = await registerCourseApi({ courseId: data?._id });
        if (response) {
          const response = await getInfoApi();
          if (response) {
            setUserInfo(response);
            navigate('/courses/my-courses');
          } else localStorage.removeItem('token');
          showToast({ title: title2, severity: 'success' });
        }
      }
    });
  };

  return (
    <div className="mt-24 flex flex-wrap">
      <Modal title={`Giới thiệu khóa học ${data?.name}`} show={showz} setShow={setShowz}>
        <div className="p-6 flex justify-center">
          <ReactPlayer url={data?.trailer} controls width="100%" height="600px" />
        </div>
      </Modal>
      <div className="sm:w-full lg:w-7/12 text-left p-4">
        <div className="flex flex-col gap-6 px-2">
          <h1 className="text-xl uppercase font-semibold">{data?.name}</h1>
          <Hr />
          <span>{data?.description}</span>
          <Hr />
          {data?.skills?.length > 0 && (
            <>
              <h2 className="uppercase font-semibold">Bạn sẽ học được gì?</h2>
              <div className="card flex flex-col gap-2">
                {data.skills.map((skill, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="font-bold text-success-600">
                      <BiCheck size={24} />
                    </div>
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
              <Hr />
            </>
          )}
          {data?.lessons?.length > 0 && (
            <>
              <h2 className="uppercase font-semibold">Nội dung khóa học</h2>
              <div className="card flex flex-col gap-2">
                <div className="flex gap-2 items-center">
                  <span>{data?.lessons?.length} bài học</span>
                  <span>•</span>
                  <span>
                    Thời lượng{' '}
                    {formatMinuteStringV2(
                      data.lessons.reduce((total, currentItem) => {
                        return total + currentItem.time;
                      }, 0)
                    )}
                  </span>
                </div>
                <Hr />
                {data.lessons.map((lesson, index) => (
                  <div key={index} className="flex justify-between p-2 bg-primary-50   rounded-md cursor-pointer">
                    <span>
                      {index + 1}. {lesson.title}
                    </span>
                    <span className="text-sm">{formatMinuteStringV1(lesson.time)}</span>
                  </div>
                ))}
              </div>
              <Hr />
            </>
          )}
          {data?.requirements?.length > 0 && (
            <>
              <h2 className="uppercase font-semibold">Yêu cầu</h2>
              <div className="card flex flex-col gap-2">
                {data.requirements.map((req, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="font-bold text-success-600">
                      <BiCheck size={24} />
                    </div>
                    <span>{req}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
      <div className="sm:w-full lg:w-5/12 p-4">
        <div className="flex flex-col gap-6 px-2">
          <div className="flex flex-col items-center justify-center my-8">
            <div
              className="relative h-60 w-9/12 px-2 overflow-hidden"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="h-full w-full flex justify-center items-center">
                <div className="relative h-60 w-full rounded-lg bg-cover bg-slate-100" style={{ backgroundImage: `url('${data?.image}')` }}>
                  <span className="absolute top-0 left-0 w-full rounded-lg h-full bg-primary-500 opacity-20"></span>
                  {Boolean(data?.price) ? (
                    <div className="absolute top-2 left-2 p-1 rounded-sm">
                      <FaCrown className="relative text-yellow-500 z-10" />
                      <div className="absolute h-full w-full top-0 left-0 bg-slate-50 opacity-70 rounded-sm z-0"></div>
                    </div>
                  ) : (
                    <div className="absolute top-2 left-2 p-1 rounded-sm">
                      <div className="relative text-yellow-500 z-10">Miễn phí</div>
                      <div className="absolute h-full w-full top-0 left-0 bg-slate-50 opacity-70 rounded-sm z-0"></div>
                    </div>
                  )}
                </div>
              </div>
              <div className={`absolute rounded-md mx-2 inset-0 justify-center items-center group-hover:flex flex`}>
                {isHovered && <div className="absolute rounded-md inset-0 bg-black bg-opacity-10 opacity-30"></div>}
                <div
                  className={`font-medium z-10 duration-300 ease-in-out transform 
                  ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
                >
                  <Button severity="secondary" label="Xem giới thiệu" onClick={() => setShowz(true)} />
                </div>
              </div>
            </div>

            <div className="flex gap-2 mt-4">
              {Boolean(userInfo?.courses?.find((c) => c.course?._id === data?._id)) ? (
                <Button onClick={() => navigate(`/learning/${data?.slug}`)} label="Tiếp tục học" />
              ) : (
                <Button onClick={onRegister} label="Đăng ký học" />
              )}
              {check && (
                <Button
                  onClick={() => {
                    if (!isAuthenticated) onWarning();
                    else setShow(true);
                  }}
                  severity="danger"
                  label="Đánh giá"
                />
              )}
            </div>
          </div>

          <Reviews
            data={data?.reviews}
            courseId={data?._id}
            rating={data?.rating}
            show={show}
            setShow={setShow}
            userInfo={userInfo}
            setRender={setRender}
          />
        </div>
      </div>
    </div>
  );
};

export default DetailCourseWeb;

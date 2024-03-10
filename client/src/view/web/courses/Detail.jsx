import { Button, Hr } from '@components/uiCore';
import { FaCrown } from 'react-icons/fa';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BiCheck } from 'react-icons/bi';
import Reviews from './Reviews';
import { useConfirmState, useToastState } from '@store';
import { useAuthContext } from '@context/AuthContext';
import { formatMinuteStringV1, formatMinuteStringV2, formatNumber } from '@utils';
import {courses} from "../../../data";

const DetailCourseWeb = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const { userInfo, isAuthenticated, setUserInfo } = useAuthContext();
  const { showToast } = useToastState();
  const { showConfirm } = useConfirmState();
  const [show, setShow] = useState(false);
  const [render, setRender] = useState(false);
  const data = courses.find(c => c.slug === slug)
  const reviews = data?.reviews;
  const check = reviews && Array.isArray(reviews) ? !Boolean(reviews.find((r) => r.by._id === userInfo._id)) : true;

  const onWarning = async () => {
    showConfirm({
      title: 'Vui lòng đăng nhập để có thể tiếp tục!',
      action: () => navigate('/auth/signin')
    });
  };

  const onRegister = async () => {
  };

  return (
    <div className="mt-24 flex flex-wrap">
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
            <div className="relative h-60 w-9/12 rounded-lg bg-cover" style={{ backgroundImage: `url('${data?.image}')` }}>
              <span className="absolute top-0 left-0 w-full rounded-lg h-full bg-primary-500 opacity-15"></span>
              {Boolean(data?.price) && (
                <div className="absolute top-2 left-2 p-1 rounded-sm">
                  <FaCrown className="relative text-yellow-500 z-10" />
                  <div className="absolute h-full w-full top-0 left-0 bg-slate-50 opacity-70 rounded-sm z-0"></div>
                </div>
              )}
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

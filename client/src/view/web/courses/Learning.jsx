import { Button, Hr } from '@components/uiCore';
import React, { useEffect, useState } from 'react';
import { BiChevronLeft, BiMenu } from 'react-icons/bi';
import { BiChevronRight } from 'react-icons/bi';
import Lesson from './Lesson';
import { detailCourseRegisterApi } from '@api';
import { useGetApi } from '@lib/react-query';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { BiPlayCircle } from 'react-icons/bi';
import { TERipple } from 'tw-elements-react';
import { BiSolidCheckCircle } from 'react-icons/bi';
import { BiSolidLock } from 'react-icons/bi';
import Discuss from './Discuss';
import { BiSolidConversation } from 'react-icons/bi';
import { formatMinuteStringV1 } from '@utils';

const Learning = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { slug } = useParams();
  const [isShow, setIsShow] = useState(true);
  const [show, setShow] = useState(false);
  const [render, setRender] = useState(false);
  const { data } = useGetApi(detailCourseRegisterApi, { slug, render }, 'course');
  const id = new URLSearchParams(location.search).get('id');
  const completedLessons = data?.lessons?.filter((l) => l.status === 'isCompleted') || [];
  const currentIndex = data?.lessons?.findIndex((l) => l.lesson?._id === id);
  const currentLesson = data?.lessons?.[currentIndex]?.lesson;
  const isPrevLesson = currentIndex !== 0;
  const isNextLesson = ['isCompleted', 'isStudy'].includes(data?.lessons?.[currentIndex + 1]?.status);

  useEffect(() => {
    if (!id && data?.lessons && Array.isArray(data.lessons)) {
      const lessonStudy = data?.lessons?.find((item) => item.status === 'isStudy');
      if (lessonStudy) navigate(`/learning/${slug}?id=${lessonStudy.lesson?._id}`);
    }
  }, [data]);

  const onToggleLesson = (type) => {
    const index = type === 'prev' ? currentIndex - 1 : currentIndex + 1;
    navigate(`/learning/${slug}?id=${data?.lessons?.[index]?.lesson?._id}`);
  };

  return (
    <div>
      <div
        className={`fixed transition-all duration-500 ease-in-out ${isShow ? 'right-[25rem] bottom-[5rem]' : 'right-[1rem] bottom-[5rem]'}`}
      >
        <Button onClick={() => setShow(true)}>
          <BiSolidConversation size={20} /> Thảo luận
        </Button>
      </div>
      <Discuss show={show} setShow={setShow} lessonId={currentLesson?._id} />
      <div
        className={`fixed left-0 right-0 bottom-0 z-20 h-16 bg-primary-100 flex justify-between transition-all duration-500 p-2 ease-in-out items-center`}
      >
        <div className="w-24"></div>
        <div className="flex gap-2">
          <Button onClick={() => onToggleLesson('prev')} severity="secondary" className="font-semibold" disabled={!isPrevLesson}>
            <BiChevronLeft size={24} /> Bài trước
          </Button>
          <Button onClick={() => onToggleLesson('next')} severity="secondary" className="font-semibold" disabled={!isNextLesson}>
            Bài tiếp theo <BiChevronRight size={24} />
          </Button>
        </div>
        <Button onClick={() => setIsShow(!isShow)} severity="secondary" className="!px-4 !py-2">
          <h4 className="font-semibold">{currentLesson?.title}</h4>
          <BiMenu size={24} />
        </Button>
      </div>
      <div
        className={`fixed right-0 top-0 z-10 h-full overflow-hidden bg-white
        shadow-[0_4px_12px_0_rgba(0,0,0,0.07),_0_2px_4px_rgba(0,0,0,0.05)] dark:bg-zinc-800 
        transition-all duration-500 ease-in-out px-2 w-96 ${isShow ? '' : 'translate-x-full'}`}
      >
        <div className="mt-20 mb-32 flex flex-col gap-2 text-left">
          <h3 className="text-lg uppercase font-semibold p-2">Nội dung khóa học</h3>
          <Hr />
          <div className="h-[72vh] overflow-scroll">
            {data?.lessons?.length > 0 &&
              data.lessons.map((item, index) => {
                const isOpen = ['isStudy', 'isCompleted'].includes(item.status);
                return (
                  <TERipple className="w-full" rippleColor="light" key={index}>
                    <div
                      onClick={() => isOpen && navigate(`/learning/${slug}?id=${item.lesson?._id}`)}
                      className={`flex justify-between items-center px-4 py-2 ${isOpen ? (id === item?.lesson?._id ? 'cursor-pointer bg-red-100 text-gray-800' : 'hover:bg-primary-50 cursor-pointer bg-white') : 'bg-primary-50 cursor-default'}`}
                    >
                      <div className="flex flex-col gap-2">
                        <span className="font-medium">
                          {index + 1}. {item.lesson?.title}
                        </span>
                        <div className="flex gap-2 items-center">
                          {id === item?.lesson?._id ? <BiPlayCircle size={20} className="text-red-400" /> : <BiPlayCircle size={20} />}
                          <span>|</span>
                          <span>{formatMinuteStringV1(item.lesson?.time)}</span>
                        </div>
                      </div>
                      <div className="h-12 w-12 flex justify-center items-center">
                        {item.status === 'isLocked' ? (
                          <BiSolidLock size={20} />
                        ) : item.status === 'isCompleted' ? (
                          <BiSolidCheckCircle className="text-success-500" size={20} />
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                    <Hr />
                  </TERipple>
                );
              })}
          </div>
        </div>
      </div>
      <div className={`mt-24 transition-all duration-500 ease-in-out flex flex-col gap-2 text-left ${isShow ? 'mr-96' : ''}`}>
        <div className="flex justify-between items-center">
          <h1 className="text-xl uppercase font-semibold">{data?.course?.name}</h1>
          <div className="flex gap-2">
            <span>
              {completedLessons.length}/{data?.lessons?.length} bài học
            </span>
          </div>
        </div>
        <Hr />
        <Lesson courseId={data?.course?._id} lessonId={id} setRender={setRender} />
      </div>
    </div>
  );
};

export default Learning;

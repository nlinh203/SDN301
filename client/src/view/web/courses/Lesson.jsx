import { UploadFiles } from '@components/form';
import { Button, Hr } from '@components/uiCore';
import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import { BiSolidHeart } from 'react-icons/bi';
import AnswerQuestion from './AnswerQuestion';
import {lessons} from "../../../data";

const Lesson = ({ courseId, lessonId, setRender }) => {
  const data = lessons.find(l => l._id === lessonId)
  const [show, setShow] = useState()
  const date = new Date(data?.updatedAt);
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return (
    <div className="w-full flex flex-col gap-6">
      <AnswerQuestion show={show} setShow={setShow} data={data?.questions} courseId={courseId} lessonId={lessonId} setRender={setRender} />
      <ReactPlayer url={data?.url} controls width="auto" height="600px" />
      <Hr />
      <div className="flex flex-col gap-2">
        <h3 className="text-xl uppercase font-semibold">{data?.title}</h3>
        <Hr />
        <span className="text-sm px-4">
          Cập nhật tháng {month} năm {year}
        </span>
        <span className="text-sm px-4">{data?.description}</span>
        <Hr />
        <div className="mt-16">
          <UploadFiles label="File đính kèm" isView files={data?.files} />
        </div>
      </div>
      <div className="flex flex-col justify-start gap-6 mt-16">
        <span>Hoàn thành bài kiểm tra trên 80% để mở khóa bài học tiếp theo</span>
        <Button onClick={() => setShow(true)} >Làm bài kiểm tra</Button>
        <div className="flex gap-2 justify-start items-center">
          <span>Made with </span>
          <BiSolidHeart size={20} className="text-red-600" />
          <span> · Powered by {data?.author}</span>
        </div>
      </div>
    </div>
  );
};

export default Lesson;

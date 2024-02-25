import { getListCommentApi } from '@api';
import { Comments } from '@components/extend';
import { useGetApi } from '@lib/react-query';
import React, { useEffect, useRef, useState } from 'react';
import { BiX } from 'react-icons/bi';

const Discuss = ({ show, setShow, lessonId }) => {
  const [render, setRender] = useState(false);
  const { data: comments } = useGetApi(getListCommentApi, { objectId: lessonId, type: 2, render }, 'comments', Boolean(lessonId));
  const ref = useRef(null);

  const handleClickOutside = (e) => {
    if (ref.current && ref.current.contains(e.target)) {
      setShow(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div>
      <div
        className={`fixed right-0 top-0 z-[1050] h-full overflow-hidden bg-white
        shadow-[0_4px_12px_0_rgba(0,0,0,0.07),_0_2px_4px_rgba(0,0,0,0.05)] dark:bg-zinc-800 
        transition-all duration-500 ease-in-out px-2 w-[40rem] ${show ? '' : 'translate-x-full'}`}
      >
        <div className="flex justify-end">
          <div className="p-2">
            <BiX size={32} onClick={() => setShow(false)} className="cursor-pointer text-slate-500 hover:text-slate-700" />
          </div>
        </div>
        <div className="p-6">
          <Comments title={'Thảo luận trong bài học'} maxHeight={'600px'} objectId={lessonId} comments={comments} setRender={setRender} type={2} />
        </div>
      </div>
      {show && (
        <div ref={ref} className="transition-all duration-300 ease-in-out fixed top-0 left-0 z-[1040] bg-black w-screen h-screen block opacity-50"></div>
      )}
    </div>
  );
};

export default Discuss;

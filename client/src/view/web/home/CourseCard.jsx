import React, { useState } from 'react';
import { FaCrown } from 'react-icons/fa';
import { formatNumber } from '@utils';
import { Button, Link, Rating } from '@components/uiCore';

const CourseCard = ({ item }) => {
  const [isHovered, setIsHovered] = useState(false);
  const isPro = item.price > 0

  return (
    <>
      <div className="relative h-48 px-2 overflow-hidden" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        <div className="h-full flex justify-center items-center">
          <div className="relative h-full w-full rounded-lg bg-cover bg-slate-100" style={{ backgroundImage: `url('${item.image}')` }}>
            <span className="absolute top-0 left-0 w-full rounded-lg h-full bg-primary-500 opacity-20"></span>
            {isPro && (
              <div className="absolute top-2 left-2 p-1 rounded-sm">
                <FaCrown className="relative text-yellow-500 z-10" />
                <div className="absolute h-full w-full top-0 left-0 bg-slate-50 opacity-70 rounded-sm z-0"></div>
              </div>
            )}
          </div>
        </div>
        <div className={`absolute rounded-md mx-2 inset-0 justify-center items-center group-hover:flex flex`}>
          {isHovered && <div className="absolute rounded-md inset-0 bg-black bg-opacity-10 opacity-30"></div>}
          <Link
            to={`/courses/detail/${item.slug}`}
            className={`font-medium z-10 duration-300 ease-in-out transform 
            ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
          >
            <Button severity="secondary" label="Xem khóa học" />
          </Link>
        </div>
      </div>
      <div className="mt-2 px-4 flex flex-col gap-1 font-medium">
        <h4 className='line-clamp-2'>{item.name}</h4>
        <Rating value={item.rating || 5} />
        {isPro && (
          <div className="mt-1 flex gap-2 text-lg">
            <span className="line-through">{formatNumber(item.price || 0)}đ</span>
            <span className="text-red-600">{formatNumber(Number(item.price || 0) - Number(item.sale || 0))}đ</span>
          </div>
        )}
      </div>
    </>
  );
};

export default CourseCard;

import React, { useState } from 'react';
import { FaCrown } from 'react-icons/fa';
import { formatNumber } from '@utils';
import { Button, Link, Rating } from '@components/uiCore';

const CourseCard = ({ item }) => {
  const [isHovered, setIsHovered] = useState(false);
  const isPro = item.price > 0

  // return (
  //   <>
  //     <div className="relative h-48 px-2 overflow-hidden" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
  //       <div className="h-full flex justify-center items-center">
  //         <div className="relative h-full w-full rounded-lg bg-cover bg-slate-100" style={{ backgroundImage: `url('${item.image}')` }}>
  //           <span className="absolute top-0 left-0 w-full rounded-lg h-full bg-primary-500 opacity-20"></span>
  //           {isPro && (
  //             <div className="absolute top-2 left-2 p-1 rounded-sm">
  //               <FaCrown className="relative text-yellow-500 z-10" />
  //               <div className="absolute h-full w-full top-0 left-0 bg-slate-50 opacity-70 rounded-sm z-0"></div>
  //             </div>
  //           )}
  //         </div>
  //       </div>
}
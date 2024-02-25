import React from 'react';
import Slider from 'react-slick';
import { Hr, Link } from '@components/uiCore';
import CourseCard from './CourseCard';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

const CourseSlider = ({ items = [], type = 'new' }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div className="rounded-md px-2 pb-6 pt-2 border-neutral-300 border-[1px]">
      <div className="flex justify-between items-center m-2">
        <h2 className="font-semibold uppercase">{type === 'new' ? 'Khóa học mới' : 'Khóa học nổi bật'}</h2>
        <Link to="/courses" className="!text-sm font-medium">
          Xem tất cả khóa học
        </Link>
      </div>
      <Hr />
      <div className="slider-container mt-4">
        {items.length > 3 ? (
          <Slider {...settings}>
            {items.map((item, index) => {
              return <CourseCard item={item} key={index} />;
            })}
          </Slider>
        ) : (
          <div className="flex flex-wrap">
            {items.length > 0 ?
              items.map((item, index) => {
                return (
                  <div key={index} className="xs:w-full sm:w-6/12 md:w-4/12 lg:w-3/12">
                    <CourseCard item={item} />
                  </div>
                );
              }) : <div className="p-4 font-medium text-lg">Chưa có khóa học nào được tạo!</div>}
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseSlider;

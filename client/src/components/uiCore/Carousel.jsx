import React from 'react';
import { TECarousel, TECarouselItem } from 'tw-elements-react';

const Carousel = ({ items = [] }) => {
  return (
    <div className='relative z-10'>
      <TECarousel showControls showIndicators ride="carousel" className="w-full">
        <div className="relative w-full h-80 overflow-hidden after:clear-both after:block after:content-['']">
          {items.map((item, index) => (
            <TECarouselItem
              key={index}
              itemID={index + 1}
              className="relative float-left h-80 -mr-[100%] hidden w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
            >
              <img src={item.image} className="block w-full" alt="..." />
              <div className="absolute inset-x-[15%] bottom-5 hidden py-5 text-center text-white md:block">
                <h5 className="text-xl">{item.title}</h5>
                <p>{item.subTitle}</p>
              </div>
            </TECarouselItem>
          ))}
        </div>
      </TECarousel>
    </div>
  );
};

export default Carousel;

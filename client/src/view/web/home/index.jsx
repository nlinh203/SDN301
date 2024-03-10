import { Carousel } from '@components/uiCore';
import React from 'react';
import CourseSlider from './CourseSlider';
import PostList from './PostList';
import {courses, posts} from "../../../data";

const Home = () => {

  return (
    <div className='flex flex-col gap-12'>
      <Carousel
        items={[
          {
            title: 'First slide label',
            rating: '3/5',
            price: 500000,
            sale: 10000,
            image: 'https://tecdn.b-cdn.net/img/Photos/Slides/img%20(15).jpg'
          },
          {
            title: 'Second slide label',
            rating: '3/5',
            price: 500000,
            sale: 10000,
            image: 'https://tecdn.b-cdn.net/img/Photos/Slides/img%20(22).jpg'
          },
          {
            title: 'Third slide label',
            rating: '3/5',
            price: 500000,
            sale: 10000,
            image: 'https://tecdn.b-cdn.net/img/Photos/Slides/img%20(23).jpg'
          }
        ]}
      />
      <CourseSlider items={courses.filter(c => c.isNew)} type="new" />
      <CourseSlider items={courses.filter(c => c.isHot)} type="hot" />
      <PostList items={posts} />
    </div>
  );
};

export default Home;

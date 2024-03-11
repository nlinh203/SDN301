import { Carousel } from '@components/uiCore';
import React from 'react';
import CourseSlider from './CourseSlider';
import PostList from './PostList';
import { useGetApi } from '@lib/react-query';
import { getListCourseWebApi, getListPostWebApi } from '@api';

const Home = () => {
  const { data: posts } = useGetApi(getListPostWebApi, { page: 1, limit: 10 }, 'posts');
  const { data: coursesNew } = useGetApi(getListCourseWebApi, { page: 1, limit: 10, characteristic: ['isNew'] }, 'coursesNew');
  const { data: coursesHot } = useGetApi(getListCourseWebApi, { page: 1, limit: 10, characteristic: ['isHot'] }, 'coursesHot');

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
      <CourseSlider items={coursesNew?.documents} type="new" />
      <CourseSlider items={coursesHot?.documents} type="hot" />
      <PostList items={posts?.documents} />
    </div>
  );
};

export default Home;

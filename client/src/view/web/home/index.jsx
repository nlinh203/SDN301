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
            title: 'Môi trường học tập đa dạng và phong phú, từ các khóa học cơ bản đến nâng cao, từ các lĩnh vực chuyên ngành đến nghệ thuật và văn hóa.',
            image: 'https://tecdn.b-cdn.net/img/Photos/Slides/img%20(15).jpg'
          },
          {
            title: 'Người dùng có thể dễ dàng duyệt qua các chủ đề khóa học khác nhau, tìm kiếm theo từ khóa, chủ đề hoặc ngôn ngữ để tìm tài liệu phù hợp với nhu cầu học tập của mình',
            image: 'https://tecdn.b-cdn.net/img/Photos/Slides/img%20(22).jpg'
          },
          {
            title: 'Mỗi khóa học trong dự án này đều được thiết kế cẩn thận, kết hợp các video bài giảng chất lượng cao, tài liệu đọc, bài tập thực hành và các tài nguyên học tập khác như diễn đàn trực tuyến và tư vấn trực tiếp',
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

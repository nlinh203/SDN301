import React, { useState } from 'react';
import { SelectFormV2 } from '@components/form';
import { useGetParams } from '@hook';
import { useGetApi } from '@lib/react-query';
import { DataFilter, DataTable, RoleTitle, TimeBody } from '@components/base';
import { useDataState } from '@store';
import { getListCourseReviewApi } from '@api';
import { Link, Rating } from '@components/uiCore';

const Filter = ({ setParams, courses }) => {
  const [filter, setFilter] = useState({});

  return (
    <DataFilter filter={filter} setFilter={setFilter} setParams={setParams} className={'xs:w-full lg:w-6/12'}>
      <SelectFormV2
        value={filter.courseId}
        onValueChange={(e) => setFilter({ ...filter, courseId: e.value })}
        data={courses.map((c) => ({ label: c.name, key: c._id }))}
        label="Khóa học"
      />
      <SelectFormV2
        value={filter.rating}
        onValueChange={(e) => setFilter({ ...filter, rating: e.value })}
        data={[1, 2, 3, 4, 5]}
        label="Xếp hạng"
      />
    </DataFilter>
  );
};

const CourseReviews = () => {
  const initParams = useGetParams();
  const [params, setParams] = useState(initParams);
  const { courses } = useDataState();

  const columns = [
    {
      label: 'Khóa học',
      body: (item) => {
        const course = courses.find((c) => c._id === item.courseId);
        return <Link to={`/courses/detail/${course?.slug}`}>{course?.name}</Link>;
      }
    },
    { label: 'Người đánh giá', body: (item) => RoleTitle(item?.by?.fullName, item?.by?.role, 16) },
    {
      label: 'Xếp hạng',
      body: (item) => (
        <div className="text-center w-full flex justify-center">
          <Rating value={item.rating} />
        </div>
      )
    },
    { label: 'Nội dung', field: 'content' },
    { label: 'Thời gian đánh giá', body: (item) => TimeBody(item.createdAt) }
  ];

  const { isLoading, data } = useGetApi(getListCourseReviewApi, params, 'courseReviews');

  return (
    <>
      <Filter setParams={setParams} courses={courses} />
      <DataTable
        isLoading={isLoading}
        data={data?.documents}
        totalRecord={data?.total}
        columns={columns}
        params={params}
        setParams={setParams}
      />
    </>
  );
};

export default CourseReviews;

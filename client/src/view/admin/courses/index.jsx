import React, { useState } from 'react';
import { deleteCourseApi, getListCourseApi, getListCourseInfoApi, updateCourseApi } from '@api';
import { InputFormV2, SelectFormV2 } from '@components/form';
import { courseType, statuses } from '@constant';
import { useGetParams } from '@hook';
import { useGetApi } from '@lib/react-query';
import { DataFilter, FormList, NumberBody, TimeBody } from '@components/base';
import { useNavigate } from 'react-router-dom';
import { useDataState } from '@store';
import { Link } from '@components/uiCore';

const Filter = ({ setParams }) => {
  const [filter, setFilter] = useState({});

  return (
    <DataFilter filter={filter} setFilter={setFilter} setParams={setParams} className={'xs:w-full lg:w-9/12'}>
      <InputFormV2
        value={filter.keySearch}
        onChange={(e) => setFilter({ ...filter, keySearch: e.target.value })}
        label="Tìm kiếm theo tên, mã khóa học"
      />
      <InputFormV2
        type="number"
        value={filter.fromPrice}
        onChange={(e) => setFilter({ ...filter, fromPrice: e.target.value })}
        label="Giá từ"
      />
      <InputFormV2
        type="number"
        value={filter.toPrice}
        onChange={(e) => setFilter({ ...filter, toPrice: e.target.value })}
        label="Giá đến"
      />
      <SelectFormV2 value={filter.type} onValueChange={(e) => setFilter({ ...filter, type: e.value })} data={courseType} label="Thể loại" />
      <SelectFormV2
        value={filter.status}
        onValueChange={(e) => setFilter({ ...filter, status: e.value })}
        data={statuses}
        label="Trạng thái"
      />
    </DataFilter>
  );
};

const Courses = () => {
  const { setCourses } = useDataState();
  const navigate = useNavigate();
  const initParams = useGetParams();
  const [params, setParams] = useState(initParams);

  const columns = [
    { label: 'Tên khóa học', body: (item) => <Link to={`/courses/detail/${item.slug}`}>{item.name}</Link> },
    { label: 'Mã khóa học', field: 'code' },
    { label: 'Thể loại', body: (item) => courseType.find((c) => c.key === item.type)?.label },
    { label: 'Giá', body: (item) => NumberBody(item.price) },
    { label: 'Khuyến mãi', body: (item) => NumberBody(item.sale) },
    { label: 'Thời gian tạo', body: (item) => TimeBody(item.createdAt) },
    { label: 'Thời gian cập nhật', body: (item) => TimeBody(item.updatedAt) }
  ];

  const { isLoading, data } = useGetApi(getListCourseApi, params, 'courses');

  const onSuccess = async () => {
    const courses = await getListCourseInfoApi();
    if (courses) setCourses(courses);
  };

  return (
    <FormList
      isLoading={isLoading}
      title="Quản lý khóa học"
      data={data?.documents}
      totalRecord={data?.total}
      columns={columns}
      params={params}
      setParams={setParams}
      baseActions={['insert', 'detail', 'delete']}
      actionsInfo={{ onViewDetail: (item) => navigate(`/admin/courses/detail/${item._id}`), deleteApi: deleteCourseApi }}
      statusInfo={{ changeStatusApi: updateCourseApi }}
      headerInfo={{ onInsert: () => navigate('/admin/courses/insert') }}
      onSuccess={onSuccess}
    >
      <Filter setParams={setParams} />
    </FormList>
  );
};

export default Courses;

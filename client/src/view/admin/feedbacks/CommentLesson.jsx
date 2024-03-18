import React, { useState } from 'react';
import { getListCommentLessonApi } from '@api';
import { InputFormV2, SelectFormV2 } from '@components/form';
import { commentStatus } from '@constant';
import { useGetParams } from '@hook';
import { useGetApi } from '@lib/react-query';
import { DataFilter, DataTable, RoleTitle, TimeBody } from '@components/base';

const Filter = ({ setParams }) => {
  const [filter, setFilter] = useState({});

  return (
    <DataFilter filter={filter} setFilter={setFilter} setParams={setParams} className={'xs:w-full lg:w-3/12'}>
      <InputFormV2
        type="date"
        value={filter.fromDate}
        onChange={(e) => setFilter({ ...filter, fromDate: e.target.value })}
        label="Từ ngày"
      />
      <InputFormV2 type="date" value={filter.toDate} onChange={(e) => setFilter({ ...filter, toDate: e.target.value })} label="Đến ngày" />
      <SelectFormV2
        value={filter.status}
        onValueChange={(e) => setFilter({ ...filter, status: e.value })}
        data={commentStatus}
        label="Trạng thái"
      />
    </DataFilter>
  );
};

const CommentLessons = () => {
  const initParams = useGetParams();
  const [params, setParams] = useState(initParams);

  const columns = [
    { label: 'Nội dung', field: 'content' },
    {
      label: 'File đính kèm',
      body: (item) => (
        <a href={item.file} target="_blank">
          {item.file}
        </a>
      )
    },
    { label: 'Trạng thái', body: (item) => commentStatus.find((u) => u.key === item.status)?.label },
    { label: 'Người đặt câu hỏi', body: (item) => RoleTitle(item?.by?.fullName, item?.by?.role, 16) },
    { label: 'Thời gian tạo', body: (item) => TimeBody(item.createdAt) }
  ];

  const { isLoading, data } = useGetApi(getListCommentLessonApi, params, 'commentLessonApi');

  return (
    <>
      <Filter setParams={setParams} />
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

export default CommentLessons;

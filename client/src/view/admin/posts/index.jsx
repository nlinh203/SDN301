import React, { useState } from 'react';
import { deletePostApi, getListPostApi, updatePostApi } from '@api';
import { InputFormV2, SelectFormV2 } from '@components/form';
import { useGetParams } from '@hook';
import { useGetApi } from '@lib/react-query';
import DetailPost from './Detail';
import { Body, DataFilter, FormList, NumberBody, RoleTitle, TimeBody } from '@components/base';
import { postType, statuses } from '@constant';

const Filter = ({ setParams }) => {
  const [filter, setFilter] = useState({});

  return (
    <DataFilter filter={filter} setFilter={setFilter} setParams={setParams} className={'xs:w-full lg:w-3/12'}>
      <InputFormV2
        value={filter.keySearch}
        onChange={(e) => setFilter({ ...filter, keySearch: e.target.value })}
        label="Tìm kiếm theo tiêu đề bài viết"
      />
      <SelectFormV2 value={filter.type} onValueChange={(e) => setFilter({ ...filter, type: e.value })} data={postType} label="Loại" />
      <SelectFormV2 value={filter.status} onValueChange={(e) => setFilter({ ...filter, status: e.value })} data={statuses} label="Trạng thái" />
    </DataFilter>
  );
};

const Posts = () => {
  const initParams = useGetParams();
  const [params, setParams] = useState(initParams);
  const [show, setShow] = useState(false);

  const columns = [
    { label: 'Tiêu đề bài viết', field: 'title' },
    { label: 'Loại', body: (item) => Body(postType, item.type) },
    { label: 'Người viết', body: (item) => RoleTitle(item?.by?.fullName, item?.by?.role, 16) },
    { label: 'Thời gian đọc (phút)', body: (item) => NumberBody(item.time) },
    { label: 'Thời gian tạo', body: (item) => TimeBody(item.createdAt) },
    { label: 'Thời gian cập nhật', body: (item) => TimeBody(item.updatedAt) }
  ];

  const { isLoading, data } = useGetApi(getListPostApi, params, 'posts');

  return (
    <>
      <DetailPost show={show} setShow={setShow} setParams={setParams} data={data?.documents} mode="admin" />
      <FormList
        isLoading={isLoading}
        title="Quản lý bài viết"
        data={data?.documents}
        totalRecord={data?.total}
        columns={columns}
        params={params}
        setParams={setParams}
        baseActions={['insert', 'detail', 'delete']}
        actionsInfo={{ onViewDetail: (item) => setShow(item._id), deleteApi: deletePostApi }}
        headerInfo={{ onInsert: () => setShow(true) }}
        statusInfo={{ changeStatusApi: updatePostApi }}
      >
        <Filter setParams={setParams} />
      </FormList>
    </>
  );
};

export default Posts;

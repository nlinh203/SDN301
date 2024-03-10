import React, { useState } from 'react';
import { InputFormV2, SelectFormV2 } from '@components/form';
import { useGetParams } from '@hook';
import DetailPost from './Detail';
import { Body, DataFilter, FormList, NumberBody, RoleTitle, TimeBody } from '@components/base';
import { postType } from '@constant';
import {posts} from "../../../data";

const Filter = ({ setParams }) => {
  const [filter, setFilter] = useState({});

  return (
    <DataFilter filter={filter} setFilter={setFilter} setParams={setParams} className={'xs:w-full lg:w-6/12'}>
      <InputFormV2
        value={filter.keySearch}
        onChange={(e) => setFilter({ ...filter, keySearch: e.target.value })}
        label="Tìm kiếm theo tiêu đề bài viết"
      />
      <SelectFormV2
        value={filter.type}
        onValueChange={(e) => setFilter({ ...filter, type: e.value })}
        data={postType}
        label="Trạng thái"
      />
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

  return (
    <>
      <DetailPost show={show} setShow={setShow} setParams={setParams} data={posts} mode="admin" />
      <FormList
        title="Quản lý bài viết"
        data={posts}
        totalRecord={posts.length}
        columns={columns}
        params={params}
        setParams={setParams}
        baseActions={['insert', 'detail', 'delete']}
        actionsInfo={{ onViewDetail: (item) => setShow(item._id)}}
        headerInfo={{ onInsert: () => setShow(true) }}
      >
        <Filter setParams={setParams} />
      </FormList>
    </>
  );
};

export default Posts;

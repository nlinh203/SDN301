import React, { useState } from 'react';
import { deleteTemplateApi, getListTemplateApi, updateTemplateApi } from '@api';
import { InputFormV2, SelectFormV2 } from '@components/form';
import { useGetParams } from '@hook';
import { useGetApi } from '@lib/react-query';
import DetailTemplate from './Detail';
import { DataFilter, FormList, TimeBody } from '@components/base';
import { statuses } from '@constant';

const Filter = ({ setParams }) => {
  const [filter, setFilter] = useState({});

  return (
    <DataFilter filter={filter} setFilter={setFilter} setParams={setParams} className={'xs:w-full lg:w-6/12'}>
      <InputFormV2
        value={filter.keySearch}
        onChange={(e) => setFilter({ ...filter, keySearch: e.target.value })}
        label="Tìm kiếm theo tiêu đề, mã template"
      />
      <SelectFormV2
        value={filter.status}
        onValueChange={(e) => setFilter({ ...filter, status: e.value })}
        data={statuses}
        label="Trạng thái"
      />
    </DataFilter>
  );
};

const Templates = () => {
  const initParams = useGetParams();
  const [params, setParams] = useState(initParams);
  const [show, setShow] = useState(false);

  const columns = [
    { label: 'Tiêu đề template', field: 'subject' },
    { label: 'Mã template', field: 'code' },
    { label: 'Thời gian tạo', body: (item) => TimeBody(item.createdAt) },
    { label: 'Thời gian cập nhật', body: (item) => TimeBody(item.updatedAt) }
  ];

  const { isLoading, data } = useGetApi(getListTemplateApi, params, 'templates');

  return (
    <>
      <DetailTemplate show={show} setShow={setShow} setParams={setParams} data={data?.documents} />
      <FormList
        isLoading={isLoading}
        title="Quản lý template"
        data={data?.documents}
        totalRecord={data?.total}
        columns={columns}
        params={params}
        setParams={setParams}
        baseActions={['insert', 'detail', 'delete']}
        actionsInfo={{ onViewDetail: (item) => setShow(item._id), deleteApi: deleteTemplateApi }}
        headerInfo={{ onInsert: () => setShow(true) }}
        statusInfo={{ changeStatusApi: updateTemplateApi }}
      >
        <Filter setParams={setParams} />
      </FormList>
    </>
  );
};

export default Templates;

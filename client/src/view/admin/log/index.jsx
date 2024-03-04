import React, {useState} from 'react';
import {InputFormV2, SelectFormV2} from '@components/form';
import {useGetParams} from '@hook';
import {Body, DataFilter, FormList, NumberBody, TimeBody} from '@components/base';
import {logStatus, logType, statusLog} from "@constant";

const Filter = ({setParams, courses = []}) => {
    const [filter, setFilter] = useState({});

    return (
        <DataFilter filter={filter} setFilter={setFilter} setParams={setParams} className={'w-full'}>
            <InputFormV2 type="date" value={filter.fromDate}
                         onChange={(e) => setFilter({...filter, fromDate: e.target.value})} label="Từ ngày"/>
            <InputFormV2 type="date" value={filter.toDate}
                         onChange={(e) => setFilter({...filter, toDate: e.target.value})} label="Đến ngày"/>
            <SelectFormV2
                value={filter.type}
                onValueChange={(e) => setFilter({...filter, type: e.value})}
                data={logType}
                label="Loại thông báo"
            />
            <SelectFormV2
                value={filter.status}
                onValueChange={(e) => setFilter({...filter, status: e.value})}
                data={logStatus}
                label="Trạng thái"
            />
        </DataFilter>
    );
};

const Log = () => {
    const initParams = useGetParams();
    const [params, setParams] = useState(initParams);

    const columns = [
        {label: 'Địa chỉ nhận', field: 'to'},
        {label: 'Tiêu đề', field: 'subject'},
        {label: 'Nội dung', field: 'content'},
        {label: 'Loại thông báo', body: (item) => logType.find((c) => c.key === item.type)?.label},
        {label: 'Thời gian gửi', body: (item) => TimeBody(item.createdAt)},
        {label: 'Trạng thái', body: (item) => Body(statusLog, item.status)},
    ];

    return (
        <FormList
            title="Lịch sử gửi thông báo"
            data={[]}
            totalRecord={0}
            columns={columns}
            params={params}
            setParams={setParams}
        ><Filter setParams={setParams}/></FormList>
    );
};

export default Log;

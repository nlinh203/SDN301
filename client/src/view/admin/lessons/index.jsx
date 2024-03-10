import React, {useState} from 'react';
import {InputFormV2, SelectFormV2} from '@components/form';
import {statuses} from '@constant';
import {useGetParams} from '@hook';
import {DataFilter, FormList, NumberBody, TimeBody} from '@components/base';
import {useDataState} from '@store';
import {useNavigate} from "react-router-dom";
import {Link} from "@components/uiCore";
import {courses, lessons} from "../../../data";

const Filter = ({setParams, courses = []}) => {
    const [filter, setFilter] = useState({});

    return (
        <DataFilter filter={filter} setFilter={setFilter} setParams={setParams} className={'xs:w-full'}>
            <InputFormV2
                value={filter.keySearch}
                onChange={(e) => setFilter({...filter, keySearch: e.target.value})}
                label="Tìm kiếm theo tiêu đề, mã, tác giả"
            />
            <SelectFormV2
                value={filter.courseId}
                onValueChange={(e) => setFilter({...filter, courseId: e.value})}
                data={courses.map(c => ({label: c.name, key: c._id}))}
                label="Khóa học"
            />
            <SelectFormV2
                value={filter.status}
                onValueChange={(e) => setFilter({...filter, status: e.value})}
                data={statuses}
                label="Trạng thái"
            />
        </DataFilter>
    );
};

const Lessons = () => {
    const navigate = useNavigate()
    const initParams = useGetParams();
    const [params, setParams] = useState(initParams);

    const columns = [
        {
            label: 'Khóa học', body: (item) => {
                const course = courses.find((c) => c._id === item.courseId)
                if (course) return <Link to={`/admin/courses/detail/${course._id}`}>{course.name}</Link>
            }
        },
        {label: 'Tiêu đề bài giảng', field: 'title'},
        {label: 'Mã bài giảng', field: 'code'},
        {label: 'Tác giả', field: 'author'},
        {label: 'Thời gian học (phút)', body: (item) => NumberBody(item.time)},
        {label: 'Thời gian tạo', body: (item) => TimeBody(item.createdAt)},
        {label: 'Thời gian cập nhật', body: (item) => TimeBody(item.updatedAt)}
    ];

    return (
        <FormList
            title="Quản lý bài giảng"
            data={lessons}
            totalRecord={lessons.length}
            columns={columns}
            params={params}
            setParams={setParams}
            baseActions={['insert', 'detail', 'delete']}
            actionsInfo={{
                onViewDetail: (item) => navigate(`/admin/lessons/detail/${item._id}`),
            }}
            statusInfo={{}}
            headerInfo={{onInsert: () => navigate('/admin/lessons/insert')}}
        ><Filter setParams={setParams} courses={courses}/></FormList>
    );
};

export default Lessons;

import React, {useState} from 'react';
import {deleteLessonApi, getListLessonApi, getListLessonInfoApi, updateLessonApi} from '@api';
import {InputFormV2, SelectFormV2} from '@components/form';
import {statuses} from '@constant';
import {useGetParams} from '@hook';
import {useGetApi} from '@lib/react-query';
import {DataFilter, FormList, NumberBody, TimeBody} from '@components/base';
import {useDataState} from '@store';
import {useNavigate} from "react-router-dom";
import {Link} from "@components/uiCore";

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
    const { setLessons } = useDataState()
    const navigate = useNavigate()
    const initParams = useGetParams();
    const [params, setParams] = useState(initParams);
    const {courses} = useDataState();

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

    const {isLoading, data} = useGetApi(getListLessonApi, params, 'lessons');

    const onSuccess = async () => {
        const lessons = await getListLessonInfoApi();
        if (lessons) setLessons(lessons)
    }

    return (
        <FormList
            isLoading={isLoading}
            title="Quản lý bài giảng"
            data={data?.documents}
            totalRecord={data?.total}
            columns={columns}
            params={params}
            setParams={setParams}
            baseActions={['insert', 'detail', 'delete']}
            actionsInfo={{
                onViewDetail: (item) => navigate(`/admin/lessons/detail/${item._id}`),
                deleteApi: deleteLessonApi
            }}
            statusInfo={{changeStatusApi: updateLessonApi}}
            headerInfo={{onInsert: () => navigate('/admin/lessons/insert')}}
            onSuccess={onSuccess}
        ><Filter setParams={setParams} courses={courses}/></FormList>
    );
};

export default Lessons;

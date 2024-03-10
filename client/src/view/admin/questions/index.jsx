import React, {useState} from 'react';
import {InputFormV2, SelectFormV2} from '@components/form';
import {useGetParams} from '@hook';
import DetailQuestion from './Detail';
import {DataFilter, FormList, TimeBody} from '@components/base';
import {Link} from "@components/uiCore";
import ImportQuestion from "@view/admin/questions/ImportQuestion";
import {courses, lessons, questions} from "../../../data";

const Filter = ({setParams, courses, lessons = []}) => {
    const [filter, setFilter] = useState({});

    return (
        <DataFilter filter={filter} setFilter={setFilter} setParams={setParams} className={'xs:w-full lg:w-3/12'}>
            <InputFormV2
                value={filter.keySearch}
                onChange={(e) => setFilter({...filter, keySearch: e.target.value})}
                label="Tìm kiếm theo câu hỏi"
            />
            <SelectFormV2
                value={filter.courseId}
                onValueChange={(e) => setFilter({ ...filter, courseId: e.value, lessonId: undefined })}
                data={courses.map(c => ({ label: c.name, key: c._id }))}
                label="Khóa học"
            />
            <SelectFormV2
                value={filter.lessonId}
                onValueChange={(e) => setFilter({ ...filter, lessonId: e.value })}
                data={lessons.map(c => {
                    if (filter.courseId) {
                        if (c.courseId === filter.courseId) return { label: c.title, key: c._id}
                        else return {}
                    } else return { label: c.title, key: c._id}
                })}
                label="Bài giảng"
            />
        </DataFilter>
    );
};

const Questions = () => {
    const initParams = useGetParams();
    const [params, setParams] = useState(initParams);
    const [show, setShow] = useState(false);
    const [showImport, setShowImport] = useState(false);

    const columns = [
        {
            label: 'Bài giảng', body: (item) => {
                const lesson = lessons.find((c) => c._id === item.lessonId)
                if (lesson) return <Link to={`/admin/lessons/detail/${lesson._id}`}>{lesson.title}</Link>
            }
        },
        {label: 'Câu hỏi', field: 'content'},
        {
            label: 'Câu trả lời', body: (item) => {
                const answers = item.answers
                if (Array.isArray(answers) && answers.length > 0) {
                    return answers.map((a, index) => <div key={index}>
                        <span>{String.fromCharCode(65 + index)}. {a.label}</span> <br/>
                    </div>)
                }
            }
        },
        {
            label: 'Đáp án', body: (item) => {
                const answers = item.answers
                if (Array.isArray(answers) && answers.length > 0) {
                    const index = answers.findIndex(a => a.isAnswer)
                    if (index >= 0) return `${String.fromCharCode(65 + index)}.${answers[index]?.label}`
                }
            }
        },
        {label: 'Thời gian tạo', body: (item) => TimeBody(item.createdAt)},
        {label: 'Thời gian cập nhật', body: (item) => TimeBody(item.updatedAt)}
    ];

    return (
        <>
            <ImportQuestion show={showImport} setShow={setShowImport} setParams={setParams} />
            <DetailQuestion show={show} setShow={setShow} setParams={setParams} data={questions}
                            lessons={lessons}/>
            <FormList
                title="Quản lý câu hỏi"
                data={questions}
                totalRecord={questions.length}
                columns={columns}
                params={params}
                setParams={setParams}
                baseActions={['insert', 'detail', 'delete', 'import', 'export']}
                actionsInfo={{onViewDetail: (item) => setShow(item._id)}}
                statusInfo={{changeStatusApi: () => {}}}
                headerInfo={{onInsert: () => setShow(true), onImport: () => setShowImport(true), exportApi: () => {} }}
            ><Filter setParams={setParams} courses={courses} lessons={lessons}/></FormList>
        </>
    );
};

export default Questions;

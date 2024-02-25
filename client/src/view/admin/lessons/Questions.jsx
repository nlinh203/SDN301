import {DataTable, TimeBody} from "@components/base";
import React from "react";

const Questions = ({data, isLoading, setShow}) => {
    const columns = [
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

    return <DataTable
        isLoading={isLoading}
        data={data} totalRecord={data?.length} columns={columns} rows={[100]}
        baseActions={['insert', 'detail']} hideParams
        actionsInfo={{onViewDetail: (item) => setShow(item._id)}}
        headerInfo={{onInsert: () => setShow(true)}}
    />
}

export default Questions

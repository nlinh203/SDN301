import {DataTable, NumberBody, TimeBody} from "@components/base";
import {useNavigate} from "react-router-dom";

const Lessons = ({data}) => {
    const navigate = useNavigate()
    const columns = [
        {label: 'Tiêu đề bài giảng', field: 'title'},
        {label: 'Mã bài giảng', field: 'code'},
        {label: 'Tác giả', field: 'author'},
        {label: 'Thời gian học (phút)', body: (item) => NumberBody(item.time)},
        {label: 'Thời gian tạo', body: (item) => TimeBody(item.createdAt)},
        {label: 'Thời gian cập nhật', body: (item) => TimeBody(item.updatedAt)}
    ];

    return <DataTable
        data={data} totalRecord={data?.length} columns={columns} rows={[100]}
        baseActions={['insert', 'detail']} hideParams
        actionsInfo={{onViewDetail: (item) => navigate(`/admin/lessons/detail/${item._id}`)}}
        headerInfo={{onInsert: () => navigate('/admin/lessons/insert')}}/>
}

export default Lessons

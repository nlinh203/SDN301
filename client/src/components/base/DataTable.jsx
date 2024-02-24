import React, { useEffect, useState } from 'react';
import { BiSearch, BiTrash } from 'react-icons/bi';
import { useToastState, useConfirmState } from '@store';
import { Loading, Pagination } from '.';
import { Button, Switch } from '@components/uiCore';
import { useLocation, useNavigate } from 'react-router-dom';
import { removeSpecialCharacter } from '@utils';

const DataTable = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { showConfirm } = useConfirmState();
  const { showToast } = useToastState();
  const [loading, setLoading] = useState(false);
  const {
    title,
    data = [],
    totalRecord = 0,
    isLoading = false,
    columns = [],
    params = { page: 1, limit: 10 },
    setParams = () => {},
    actionsInfo = {},
    headerInfo = {},
    statusInfo = {},
    baseActions = [],
    rows,
    onSuccess = () => {},
    hideParams
  } = props;
  const { onViewDetail = () => {}, deleteApi = () => {}, handleDelete = (item) => ({ _id: item._id }) } = actionsInfo;
  const { onInsert = () => {}, onImport = () => {}, exportApi } = headerInfo;
  const { changeStatusApi = () => {}, handleChangeStatus = (item) => ({ _id: item._id, status: item.status ? 0 : 1 }) } = statusInfo;

  const onDelete = (item) => {
    showConfirm({
      title: 'Bạn có chắc chắn muốn xóa dữ liệu này!',
      action: async () => {
        const response = await deleteApi(handleDelete(item));
        if (response) showToast({ title: 'Xóa dữ liệu thành công!', severity: 'success' });
        setParams((pre) => ({ ...pre, render: !pre.render }));
        onSuccess(item);
      }
    });
  };

  const onExport = async () => {
    setLoading(true);
    const response = await exportApi({ ...params, page: undefined, limit: undefined });
    setLoading(false);
    if (response) {
      const downloadLink = document.createElement('a');
      downloadLink.href = URL.createObjectURL(response);
      downloadLink.download = (title && `ket-qua-export-${removeSpecialCharacter(title)}.xlsx`) || 'data.xlsx';
      downloadLink.click();
      showToast({ title: `Export ${title} thành công!`, severity: 'success' });
    }
  };

  const onChangeStatus = (item) => {
    showConfirm({
      title: 'Bạn có chắc chắn muốn chuyển trạng thái dữ liệu này!',
      action: async () => {
        const response = await changeStatusApi(handleChangeStatus(item));
        if (response) showToast({ title: 'Chuyển trạng thái thành công!', severity: 'success' });
        setParams((pre) => ({ ...pre, render: !pre.render }));
        onSuccess(item);
      }
    });
  };

  const isActions = baseActions.includes('detail') || baseActions.includes('delete');
  const isHeader = baseActions.includes('insert') || baseActions.includes('import') || baseActions.includes('export');
  const isStatus = Boolean(statusInfo.changeStatusApi);

  useEffect(() => {
    if (hideParams) return;
    const query = {};
    for (let key in params) {
      if (params.hasOwnProperty(key)) {
        const value = params[key];
        if (!['render'].includes(key) && !['', undefined, null].includes(value)) query[key] = value;
      }
    }
    navigate(location.pathname + '?' + new URLSearchParams(query).toString());
  }, [params]);

  return (
    <div className="card mt-4">
      {isHeader && (
        <div className="flex gap-2 justify-start mb-1">
          {baseActions.includes('insert') && <Button onClick={onInsert}>Thêm mới</Button>}
          {baseActions.includes('import') && (
            <Button severity="info" onClick={onImport}>
              Import
            </Button>
          )}
          {baseActions.includes('export') && (
            <Button severity="info" onClick={onExport} disabled={loading}>
              {loading && <Loading size={4} severity="neutral" />} Export
            </Button>
          )}
        </div>
      )}
      <div className="flex flex-col overflow-x-auto">
        <div className="sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-x-auto relative">
              {isLoading && (
                <div className="absolute w-full h-full bg-black opacity-30 z-10 flex justify-center items-center">
                  <Loading size={8} border={4} severity="secondary" />
                </div>
              )}
              <table className="min-w-full text-left text-sm font-light">
                <thead className="bg-neutral-100 font-medium dark:border-neutral-500 dark:text-neutral-800">
                  <tr>
                    <th scope="col" className="px-4 py-4 border-[1px] text-center">
                      #
                    </th>
                    {columns.map((column, index) => {
                      return (
                        <th scope="col" className="px-4 py-4 border-[1px] text-center" key={index}>
                          {column.label}
                        </th>
                      );
                    })}
                    {isStatus && (
                      <th scope="col" className="px-4 py-4 border-[1px] text-center">
                        Trạng thái
                      </th>
                    )}
                    {isActions && (
                      <th scope="col" className="px-4 py-4 border-[1px] text-center">
                        Actions
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {data && data.length > 0 ? (
                    data.map((item, index) => {
                      const bgColor = index % 2 === 1 ? 'bg-neutral-50' : '';
                      return (
                        <tr key={index} className="dark:border-neutral-500">
                          <td className={`px-4 py-4 font-medium border-[1px] text-center ${bgColor}`}>
                            {(params.page - 1) * params.limit + index + 1}
                          </td>
                          {columns.map((column, i) => {
                            return (
                              <td key={i} className={`border-r px-4 py-4 border-[1px] ${bgColor}`}>
                                {column.body && typeof column.body === 'function' ? column.body(item) : item[column.field]}
                              </td>
                            );
                          })}
                          {isStatus && (
                            <td className={`border-r px-4 py-4 border-[1px] ${bgColor}`}>
                              <div className="flex justify-center items-center">
                                <Switch checked={Boolean(item.status)} onChange={() => onChangeStatus(item)} />
                              </div>
                            </td>
                          )}
                          {isActions && (
                            <td className={`border-r px-4 py-4 border-[1px] ${bgColor}`}>
                              <div className="flex gap-2 justify-center items-center">
                                {baseActions.includes('detail') && (
                                  <Button rounded={true} onClick={() => onViewDetail(item)}>
                                    <BiSearch size={16} />
                                  </Button>
                                )}
                                {baseActions.includes('delete') && (
                                  <Button rounded={true} severity="danger" onClick={() => onDelete(item)}>
                                    <BiTrash size={16} />
                                  </Button>
                                )}
                              </div>
                            </td>
                          )}
                        </tr>
                      );
                    })
                  ) : (
                    <tr className="dark:border-neutral-500">
                      <td
                        className="px-4 py-4 font-medium border-[1px] text-center"
                        colSpan={columns.length + 1 + Number(isActions) + Number(isStatus)}
                      >
                        Không có dữ liệu
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-4">
        <Pagination params={params} setParams={setParams} totalRecord={totalRecord} rows={rows} />
      </div>
    </div>
  );
};

export default DataTable;

import React from 'react';
import { Button, Hr } from '../uiCore';
import { usePostApi } from '@lib/react-query';
import { Loading } from '@components/base';
import { useToastState } from '@store';

const FormDetail = (props) => {
  const { showToast } = useToastState();
  const { isUpdate, insertApi, updateApi, children, handleSubmit, handleData, setShow = () => {}, setParams = () => {}, reset } = props;
  const { mutateAsync, isLoading } = usePostApi(isUpdate ? updateApi : insertApi);

  const onSubmit = async (e) => {
    const data = handleData(e);
    const response = await mutateAsync(data);
    if (response) {
      showToast({ title: `${isUpdate ? 'Cập nhật' : 'Thêm mới'} dữ liệu thành công!`, severity: 'success' });
      setShow(false);
      setParams((pre) => ({ ...pre, render: !pre.render }));
      reset()
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="relative">
      {isLoading && (
        <div className="absolute w-full h-full bg-black opacity-30 z-10 flex justify-center items-center">
          <Loading size={8} border={4} severity="secondary" />
        </div>
      )}
      <div className="p-6">
        <div className="card flex flex-wrap">{children}</div>
      </div>
      <Hr />
      <div className="flex gap-2 justify-end py-4">
        <Button label="Hủy" severity="secondary" onClick={() => setShow(false)} />
        <Button type="submit" label="Xác nhận" />
      </div>
    </form>
  );
};

export default FormDetail;

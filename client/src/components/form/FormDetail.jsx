import React from 'react';
import { Button, Hr } from '../uiCore';
import { Loading } from '@components/base';

const FormDetail = (props) => {
  const { isUpdate, insertApi, updateApi, children, handleSubmit, handleData, setShow = () => {}, setParams = () => {}, reset } = props;

  const onSubmit = async (e) => {

  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="relative">
      {false && (
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

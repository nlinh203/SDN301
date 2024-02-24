import { changePasswordApi } from '@api';
import { Loading } from '@components/base';
import { InputFormDetail } from '@components/form';
import { Button, Hr } from '@components/uiCore';
import { INITIAL_USER_INFO, useAuthContext } from '@context/AuthContext';
import { yupResolver } from '@hookform/resolvers/yup';
import { usePostApi } from '@lib/react-query';
import { ChangePasswordValidation } from '@lib/validation';
import { useToastState } from '@store';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const ChangePassword = () => {
  const navigate = useNavigate();
  const { setUserInfo, setIsAuthenticated } = useAuthContext();
  const { showToast } = useToastState();
  const { mutateAsync, isPending } = usePostApi(changePasswordApi);

  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm({
    resolver: yupResolver(ChangePasswordValidation),
    defaultValues: {
      password: '',
      newPassword: ''
    }
  });

  const onSubmit = async (data) => {
    const response = await mutateAsync(data);
    if (response) {
      setUserInfo(INITIAL_USER_INFO);
      setIsAuthenticated(false);
      localStorage.removeItem('token');
      showToast({ title: 'Đăng xuất thành công', severity: 'success' });
      showToast({ title: 'Cập nhật mật khẩu thành công, vui lòng đăng nhập lại!', severity: 'success' });
      navigate('/auth/signin');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 w-full px-8">
      <div className="flex justify-between items-center">
        <h2 className="uppercase font-semibold text-left p-2">Đổi mật khẩu</h2>
        <Button disabled={isPending} type="submit" label="Cập nhật" />
      </div>
      <Hr />
      <div className={'relative flex flex-wrap justify-center'}>
        {isPending && (
          <div className="absolute w-full h-full bg-black opacity-30 z-10 flex justify-center items-center">
            <Loading size={8} border={4} severity="secondary" />
          </div>
        )}
        <div className="xs:w-full lg:w-8/12 my-2">
          <InputFormDetail
            className="!w-full my-1"
            id="password"
            label="Mật khẩu cũ (*)"
            type="password"
            register={register}
            errors={errors}
          />
          <InputFormDetail
            className="!w-full my-1"
            id="newPassword"
            label="Mật khẩu mới (*)"
            type="password"
            register={register}
            errors={errors}
          />
        </div>
      </div>
      <Hr />
    </form>
  );
};

export default ChangePassword;

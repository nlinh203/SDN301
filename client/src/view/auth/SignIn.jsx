import { Loading, FormAuth } from '@components/base';
import { InputFormAuth } from '@components/form';
import { Button, CheckBox, Link } from '@components/uiCore';
import { SigninValidation } from '@lib/validation';
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useToastState } from '@store';
import { usePostApi } from '@lib/react-query';
import { getInfoApi, signinApi } from '@api';
import { useAuthContext } from '@context/AuthContext';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const navigate = useNavigate();
  const { showToast } = useToastState();
  const { setUserInfo, setIsAuthenticated } = useAuthContext();
  const { mutateAsync, isPending } = usePostApi(signinApi);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(SigninValidation)
  });
  const onSubmit = async (data) => {
    const response = await mutateAsync(data);
    if (response) {
      localStorage.setItem('token', response);
      const res = await getInfoApi();
      if (res) {
        setUserInfo(res);
        setIsAuthenticated(true);
        showToast({ title: 'Đăng nhập thành công', severity: 'success' });
        navigate('/');
      }
    }
  };

  return (
    <FormAuth title="Welcome To Course Replica" subTitle="Vui lòng đăng nhập để tiếp tục">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-3 w-full">
          <InputFormAuth id="username" label="Tài khoản (*)" register={register} errors={errors} className="p-0 w-full" />
          <InputFormAuth id="password" label="Mật khẩu (*)" type="password" register={register} errors={errors} className="p-0 w-full" />
          <div className="mb-2 flex items-center justify-between">
            <CheckBox id="remember" label="Nhớ mật khẩu" />
            <Link to="/auth/forgot-password">Quên mật khẩu?</Link>
          </div>
          <Button className="w-full flex gap-4" type="submit" disabled={isPending}>
            {isPending && <Loading size={4} severity="neutral" />}
            Sign in
          </Button>
          <div className="flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
            <p className="mx-4 mb-0 text-center font-semibold dark:text-neutral-200">OR</p>
          </div>
          <div className="text-center">
            <p className="mt-2 text-md">
              Chưa có tài khoản, <Link to="/auth/signup">Đăng ký</Link>
            </p>
          </div>
        </div>
      </form>
    </FormAuth>
  );
};

export default SignIn;

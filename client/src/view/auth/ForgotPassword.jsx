import { Loading, FormAuth } from '@components/base';
import { InputFormAuth } from '@components/form';
import { Button, CheckBox, Link } from '@components/uiCore';
import { ForgotPasswordValidation } from '@lib/validation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import SendOtpInput from './shared/SendOtpInput';
<<<<<<< HEAD
import { confirmPasswordApi, sendOtpForgotPasswordApi } from '@api';
import { usePostApi } from '@lib/react-query';
import { useNavigate } from 'react-router-dom';
import { useToastState } from '@store';

const SignIn = () => {
  const navigate = useNavigate();
  const { showToast } = useToastState();
  const [isSend, setIsSend] = useState();
  const { mutateAsync, isPending } = usePostApi(confirmPasswordApi);
=======

const SignIn = () => {
  const [isSend, setIsSend] = useState();
  const isPending =false
>>>>>>> 9bc9826c4a3240fbcd8d0b707d37a1e31749c49d

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm({
    resolver: yupResolver(ForgotPasswordValidation)
  });

  const onSubmit = async (data) => {
<<<<<<< HEAD
    const response = await mutateAsync(data);
    if (response) {
      showToast({ title: 'Đổi mật khẩu thành công', severity: 'success' });
      navigate('/auth/signin');
    }
=======

>>>>>>> 9bc9826c4a3240fbcd8d0b707d37a1e31749c49d
  };

  return (
    <FormAuth title="Forgot Password" subTitle="Nhập thông tin để tiếp tục">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4">
          <InputFormAuth id="email" label="Email (*)" type="email" register={register} errors={errors} />
          <InputFormAuth id="username" label="Tài khoản (*)" register={register} errors={errors} />
          <InputFormAuth id="password" label="Mật khẩu (*)" type="password" register={register} errors={errors} />
          <SendOtpInput
            id="otp"
            register={register}
            errors={errors}
            email={watch('email')}
            username={watch('username')}
            isSend={isSend}
            setIsSend={setIsSend}
<<<<<<< HEAD
            api={sendOtpForgotPasswordApi}
=======
            api={() => {}}
>>>>>>> 9bc9826c4a3240fbcd8d0b707d37a1e31749c49d
          />
          <div className="flex items-center justify-between">
            <CheckBox id="remember" label="Đồng ý điều khoản và dịch vụ" />
          </div>
          <Button className="w-full flex gap-4" type="submit" disabled={isPending}>
            {isPending && <Loading size={4} severity="neutral" />}
            Submit
          </Button>
          <div className="flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
            <p className="mx-4 mb-0 text-center font-semibold dark:text-neutral-200">OR</p>
          </div>
          <div className="text-center">
            <p className="text-md">
              <Link to="/auth/signin">Quay lại đăng nhập</Link>
            </p>
          </div>
        </div>
      </form>
    </FormAuth>
  );
};

export default SignIn;

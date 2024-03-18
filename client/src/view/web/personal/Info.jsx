import { getInfoApi, updateUserInfoApi } from '@api';
import { Loading } from '@components/base';
import { InputFormDetail, TextAreaForm, UploadImage } from '@components/form';
import { Button, Hr } from '@components/uiCore';
import { useAuthContext } from '@context/AuthContext';
import { yupResolver } from '@hookform/resolvers/yup';
import { usePostApi } from '@lib/react-query';
import { UserInfoValidation } from '@lib/validation';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { checkEqualProp } from '@utils';
import { useToastState } from '@store';

const defaultValues = {
  fullName: '',
  username: '',
  email: '',
  address: '',
  bio: ''
};

const Info = () => {
  const { userInfo, setUserInfo } = useAuthContext();
  const [avatar, setAvatar] = useState(null);
  const { showToast } = useToastState();
  const { mutateAsync, isPending } = usePostApi(updateUserInfoApi);

  const {
    register,
    formState: { errors },
    watch,
    setValue,
    handleSubmit
  } = useForm({
    resolver: yupResolver(UserInfoValidation),
    defaultValues
  });

  useEffect(() => {
    if (userInfo.avatar) setAvatar(userInfo.avatar);
    for (const key in defaultValues) {
      setValue(key, userInfo[key]);
    }
  }, [userInfo]);

  const onSubmit = async (data) => {
    if (avatar) data.formData = { avatar };
    else if (userInfo.avatar) data.avatar = '';

    const response = await mutateAsync({ ...checkEqualProp(data, userInfo) });
    if (response) {
      showToast({ title: 'Cập nhật thông tin cá nhân thành công!', severity: 'success' });
      const response = await getInfoApi();
      if (response) {
        setUserInfo(response);
      } else localStorage.removeItem('token');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 w-full px-8">
      <div className="flex justify-between items-center">
        <h2 className="uppercase font-semibold text-left p-2">Thông tin cá nhân</h2>
        <Button disabled={isPending} type="submit" label="Cập nhật" />
      </div>
      <Hr />
      <div className={'relative flex flex-wrap'}>
        {isPending && (
          <div className="absolute w-full h-full bg-black opacity-30 z-10 flex justify-center items-center">
            <Loading size={8} border={4} severity="secondary" />
          </div>
        )}
        <div className="w-4/12 p-2">
          <UploadImage label="Ảnh đại diện" data={avatar} setData={setAvatar} />
        </div>
        <div className="flex flex-wrap w-8/12">
          <InputFormDetail id="fullName" label="Họ tên (*)" register={register} errors={errors} className="!w-full my-1" />
          <InputFormDetail id="username" label="Tài khoản (*)" disabled register={register} errors={errors} className="!w-full my-1" />
          <InputFormDetail id="email" label="Email (*)" disabled register={register} errors={errors} className="!w-full my-1" />
          <InputFormDetail id="address" label="Địa chỉ" register={register} className="!w-full my-1" />
          <TextAreaForm id="bio" label="Mô tả" className="w-full p-2 my-1" watch={watch} setValue={setValue} />
        </div>
      </div>
      <Hr />
    </form>
  );
};

export default Info;

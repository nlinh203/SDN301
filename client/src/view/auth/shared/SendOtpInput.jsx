import { Loading } from '@components/base';
import { Button } from '@components/uiCore';
import { REGEX } from '@constant';
import React from 'react';

const SendOtpInput = ({ id, register = () => {}, errors = {}, email, username, isSend, setIsSend, api }) => {
    const isPending =false
  const onSendOtp = async () => {

  };

  return (
    <div className="relative flex w-full flex-wrap items-stretch">
      <input
        id={id}
        className={`relative m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded-l border border-solid 
        ${errors[id] ? 'border-red-600' : 'border-neutral-300'} bg-transparent bg-clip-padding px-3 py-2 text-base font-normal leading-[1.6] 
        outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary 
        focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 
        dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary`}
        placeholder="Mã OTP"
        aria-describedby="button-addon1"
        {...register(id)}
      />
      <Button
        onClick={onSendOtp}
        disabled={!(username && REGEX.C_EMAIL.test(email)) || isSend || isPending}
        id="button-addon1"
        className="!py-3.5"
      >
        {isPending && <Loading size={4} severity="neutral" />}
        Gửi Otp
      </Button>

      {errors[id] && <small className="w-full ml-2 mt-1 text-danger-600 dark:text-danger-400">{errors[id].message}</small>}
    </div>
  );
};

export default SendOtpInput;

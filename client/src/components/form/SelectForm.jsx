import React, { useEffect, useRef } from 'react';
import { Select } from '../uiCore';

export const SelectFormDetail = (props) => {
  const { id, value, watch = () => {}, setValue = () => {}, className, errors = {}, ...prop } = props;

  return (
    <div className={`flex flex-col gap-1 w-full p-2 lg:w-6/12 ${className}`}>
      <Select
        theme={{
          selectInput: `peer block min-h-[auto] w-full rounded focus:border-0 ${errors[id] && !watch(id) ? 'border-2 border-danger-600' : ''} 
          bg-transparent outline-none transition-all duration-200 
            ease-linear peer-focus:text-primary motion-reduce:transition-none disabled:bg-neutral-100 dark:disabled:bg-neutral-700 
            dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary cursor-pointer disabled:cursor-default`
        }}
        onValueChange={(e) => setValue(id, e?.value)}
        value={watch(id)}
        {...prop}
      />
      {errors[id] && !watch(id) && <small className="w-full ml-2 text-danger-600 dark:text-danger-400">{errors[id].message}</small>}
    </div>
  );
};

export const SelectFormV2 = (props) => {
  const { className, value, ...prop } = props;
  const ref = useRef(null);

  useEffect(() => {
    if (!(value || value === 0)) ref?.current?.click();
  }, [value]);

  return (
    <div className={`p-2 xs:w-full sm:w-6/12 lg:w-3/12`}>
      <Select
        clearIcon={
          <div ref={ref}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        }
        value={value}
        {...prop}
      />
    </div>
  );
};

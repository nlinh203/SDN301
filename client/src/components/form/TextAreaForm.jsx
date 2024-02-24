import React from 'react';
import { TextArea } from '../uiCore';

const TextAreaForm = (props) => {
  const { id, watch = () => {}, setValue = () => {}, errors = {}, className, ...prop } = props;

  return (
    <div className={`${className}`}>
      <TextArea
        id={id}
        value={watch(id) || ''}
        onChange={(e) => setValue(id, e.value)}
        theme={{
          input: `peer block min-h-[auto] w-full rounded bg-transparent outline-none transition-all duration-200 ease-linear ${(errors[id] && !watch(id)) ? 'border-2 border-danger-600' : 'border-0' }  
          focus:placeholder:opacity-100 peer-focus:text-primary motion-reduce:transition-none placeholder:opacity-0 disabled:bg-neutral-100 focus:border-0
          read-only:bg-neutral-100 dark:disabled:bg-neutral-700 dark:read-only:bg-neutral-700 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary`
        }}
        {...prop}
      />
      {errors[id] && !watch(id) && <small className="w-full ml-2 text-danger-600 dark:text-danger-400">{errors[id].message}</small>}
    </div>
  );
};

export default TextAreaForm;

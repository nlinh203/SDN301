import React from 'react';
import { TEInput } from 'tw-elements-react';

const Input = (props) => {
  const { value =  '', size='lg', ...prop } = props;

  return <TEInput value={value} size={size} {...prop} />;
};

export default Input;

import React from 'react';
import { TETextarea } from 'tw-elements-react';

const TextArea = (props) => {
  const { onChange, ...prop } = props;

  return <TETextarea onChange={(e) => onChange(e.target)} rows={4} {...prop}></TETextarea>;
};

export default TextArea;

import React from 'react';
import { TESelect } from 'tw-elements-react';

const Select = (props) => {
  const { id, size = 'lg', value = '', onValueChange = () => {}, data = [], dataLabel = 'label', dataValue = 'key', ...prop } = props;
  const handleData = (array) => {
    return array.map((d) => {
      if (typeof d === 'object') return { text: d[dataLabel], value: d[dataValue] };
      else return { text: String(d), value: d };
    });
  };

  return (
    <TESelect
      value={value}
      onValueChange={onValueChange}
      clearBtn
      preventFirstSelection
      noResultsText="không có kết quả"
      size={size}
      data={handleData(data)}
      {...prop}
    />
  );
};

export default Select;

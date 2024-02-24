import React from 'react';
import { CheckBox } from '../uiCore';

export const MultiCheckBox = (props) => {
  const {
    id,
    value = [],
    onChange = () => {},
    label,
    children,
    data = [],
    dataLabel = 'label',
    dataValue = 'key',
    className,
    ...prop
  } = props;

  const handleData = (array) => {
    return array.map((d) => {
      if (typeof d === 'object' && d[dataLabel] && d[dataValue]) return { label: d[dataLabel], key: d[dataValue] };
      else return { label: d, key: d };
    });
  };

  return (
    <div className="flex gap-12 card items-center m-2 w-full">
      {label && <label className="w-3/12">{children || label}</label>}
      <div className={`w-full flex justify-around ${className} flex-wrap`}>
        {handleData(data).map((d, index) => {
          return (
            <CheckBox
              key={index}
              id={id + '-' + d.key}
              label={d.label}
              checked={value.includes(d.key)}
              onChange={() => {
                if (value.includes(d.key)) onChange(value.filter((v) => v !== d.key));
                else onChange([...value, d.key]);
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export const MultiCheckBoxV2 = (props) => {
  const {
    id,
    value = [],
    onChange = () => {},
    label,
    children,
    data = [],
    dataLabel = 'label',
    dataValue = 'key',
    className,
    ...prop
  } = props;

  const handleData = (array) => {
    return array.map((d) => {
      if (typeof d === 'object' && d[dataLabel] && d[dataValue]) return { label: d[dataLabel], key: d[dataValue] };
      else return { label: d, key: d };
    });
  };

  return (
    <div className="flex gap-12 items-center m-2 w-full">
      <div className={`w-full flex flex-col flex-wrap gap-2`}>
        {handleData(data).map((d, index) => {
          return (
            <CheckBox
              key={index}
              id={id + '-' + d.key}
              label={d.label}
              checked={value.includes(d.key)}
              onChange={() => {
                if (value.includes(d.key)) onChange(value.filter((v) => v !== d.key));
                else onChange([...value, d.key]);
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

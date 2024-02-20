import React from 'react';

const ProgressBar = ({ size = 2, value, className }) => {
  return (
    <div className={`h-${size} w-full bg-neutral-200 dark:bg-neutral-600 ${className}`}>
      <div className={`h-${size} bg-primary`} style={{ width: `${value}%` }}></div>
    </div>
  );
};

export default ProgressBar;

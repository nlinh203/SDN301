import React from 'react';
import { NavLink } from 'react-router-dom';

const Link = (props) => {
  const { children, className, ...prop } = props;

  return (
    <NavLink
      className={`${className} text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 
      active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600`}
      {...prop}
    >
      {children}
    </NavLink>
  );
};

export default Link;

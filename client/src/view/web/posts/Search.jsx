import React, { useEffect, useState } from 'react';
import { TERipple } from 'tw-elements-react';
import { IoMdClose } from 'react-icons/io';
import { useLocation, useNavigate } from 'react-router-dom';

const Search = ({ params, setParams }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = useState('');

  useEffect(() => {
    const query = {};
    for (let key in params) {
      if (params.hasOwnProperty(key)) {
        const value = params[key];
        if (!['render', 'sort'].includes(key) && !['', undefined, null].includes(value)) query[key] = value;
      }
    }
    if (query.keySearch) setValue(query.keySearch);
    navigate(location.pathname + '?' + new URLSearchParams(query).toString());
  }, [params]);

  const onSubmit = (e) => {
    e.preventDefault();
    setParams((pre) => ({ ...pre, keySearch: value }));
  };

  return (
    <form onSubmit={onSubmit} className="relative flex w-full flex-wrap items-stretch">
      <input
        className="relative m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded-l border border-solid 
        border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] 
        text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary 
        focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 
        dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
        placeholder="Search"
        aria-label="Search"
        aria-describedby="button-addon1"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <TERipple color="light">
        <button
          type="submit"
          className="relative z-[2] flex items-center rounded-r bg-primary px-4 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
          id="button-addon1"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
            <path
              fillRule="evenodd"
              d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </TERipple>
      {value && (
        <div
          onClick={() => {
            setValue('');
            setParams((pre) => ({ ...pre, keySearch: undefined }));
          }}
          className="absolute top-2 right-14 text-primary cursor-pointer"
        >
          <IoMdClose size={24} />
        </div>
      )}
    </form>
  );
};

export default Search;

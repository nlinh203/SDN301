import React, { useCallback } from 'react';
import { TESelect } from 'tw-elements-react';

const ButtonPagination = ({ content, onClick = () => {}, active }) => {
  return (
    <li aria-current="page">
      <button
        onClick={onClick}
        className={`relative block rounded px-3 py-1.5 text-sm cursor-pointer transition-all duration-300 
        ${active ? 'bg-primary-100 text-primary-700 font-medium' : 'bg-transparent text-neutral-600 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white'}`}
      >
        {content}
      </button>
    </li>
  );
};

const Pagination = (props) => {
  const { totalRecord = 0, params = { page: 1, limit: 10 }, setParams = () => {}, rows = [10, 20, 50] } = props;

  const renderPageLinks = useCallback(() => {
    const currentPage = params.page;
    const pageCount = Math.ceil(totalRecord / params.limit);
    const pages = [];
    if (pageCount === 0 || currentPage <= 0 || currentPage > pageCount) pages.push(1);
    else {
      pages.push(currentPage);
      const visible = 5;
      const numberPage = pageCount < visible ? pageCount : visible;
      for (let index = 1; index < numberPage; index++) {
        const pageBefore = pages[0] - 1;
        const pageAfter = pages[pages.length - 1] + 1;
        if (pageBefore > 0 && (index < numberPage / 2 || pageAfter - 1 >= numberPage)) pages.unshift(pageBefore);
        else pages.push(pageAfter);
      }
    }
    return pages.map((page, index) => (
      <ButtonPagination key={index} content={page} active={params.page === page} onClick={(e) => setParams({ ...params, page })} />
    ));
  }, [params.limit, params.page, totalRecord]);

  return (
    <>
      <nav aria-label="Page navigation example" className="flex items-center gap-4">
        <ul className="list-style-none flex">
          <ButtonPagination content={'First'} onClick={() => setParams({ ...params, page: 1 })} />
          {renderPageLinks()}
          <ButtonPagination content={'Last'} onClick={() => setParams({ ...params, page: Math.ceil(totalRecord / params.limit) || 1 })} />
        </ul>
        <span className="text-sm bg-transparent text-neutral-600">Tổng số: {totalRecord} bản ghi</span>
        <TESelect
          data={rows.map((r) => ({ text: String(r), value: r }))}
          value={params.limit || 100}
          onValueChange={(e) => setParams({ ...params, page: 1, limit: e?.value })}
          className="w-24"
        />
      </nav>
    </>
  );
};

export default Pagination;

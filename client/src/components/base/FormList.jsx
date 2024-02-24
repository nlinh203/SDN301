import React from 'react';
import DataTable from "@components/base/DataTable";

const FormList = (props) => {
    const {title, children, ...prop} = props;

    return (
        <div className="p-6 bg-white rounded-lg shadow-xl">
            <h2 className="font-semibold uppercase leading-normal text-neutral-800 dark:text-neutral-200">{title}</h2>
            {children}
            <DataTable title={title?.toLowerCase()} {...prop} />
        </div>
    );
};

export default FormList;

import {Input} from '@components/uiCore';
import React from 'react';
import {TEInput} from 'tw-elements-react';

export const InputFormAuth = (props) => {
    const {...prop} = props;

    return (
        <InputFormDetail {...prop} className={'!p-0 !w-full'}/>
    );
};

export const InputFormDetail = (props) => {
    const {
        id, register = () => {
        }, errors = {}, className, ...prop
    } = props;

    const errorTheme = {
        notchTrailingDefault: 'border-danger-600',
        notchMiddleDefault: 'border-danger-600',
        notchLeadingDefault: 'border-danger-600'
    };

    return (
        <div className={`flex flex-col gap-1 w-full p-2 lg:w-6/12 ${className}`}>
            <TEInput size="lg" id={id} {...register(id)} theme={errors[id] ? errorTheme : {}} {...prop} />
            {errors[id] &&
                <small className="w-full ml-2 text-danger-600 dark:text-danger-400">{errors[id].message}</small>}
        </div>
    );
};

export const InputFormV2 = (props) => {
    const {className, helper, ...prop} = props;

    return (
        <div className={`flex flex-col gap-1 p-2 xs:w-full sm:w-6/12 lg:w-3/12 ${className}`}>
            <Input {...prop} />
            {helper && <small className="w-full ml-2">{helper}</small>}
        </div>
    );
};

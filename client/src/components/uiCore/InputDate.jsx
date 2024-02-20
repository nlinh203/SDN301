import React, { useState } from 'react';

const InputDate = ({ placeholder }) => {
    const [date, setDate] = useState('');
    const [type, setType] = useState('text');

    const handleFocus = () => {
        setType('date');
    };

    const handleBlur = () => {
        if (!date) {
            setType('text');
        }
    };

    const handleChange = (event) => {
        setDate(event.target.value);
    };

    return (
        <input
            type={type}
            value={date}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={placeholder}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            // Thêm bất kỳ class TailwindCSS nào bạn muốn để tùy chỉnh thêm
        />
    );
};

export default InputDate;

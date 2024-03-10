import { Hr } from '@components/uiCore';
import React, { useEffect, useState } from 'react';

const Question = ({ item, result = [], setResult, total, index, isSubmit }) => {
  const [select, setSelect] = useState(null);

  useEffect(() => {
    if (!isSubmit) setSelect(null);
  }, [isSubmit]);

  return (
    <div className="card">
      <div className="flex justify-between items-center">
        <span className="font-semibold">Câu hỏi</span>
        <span>
          {index + 1}/{total}
        </span>
      </div>
      <span>{item?.content}</span>
      <Hr />
      <div className="mt-6">
        <h3 className="font-semibold">Chọn câu trả lời đúng</h3>
        <div className="flex flex-wrap">
          {item?.answers?.length > 0 &&
            item.answers.map((answer, index) => {
              const isTrue = answer.isAnswer;
              const isTrueSelect = isSubmit && isTrue;
              const isWrongSelect = isSubmit && index === select && !isTrue;
              const isSelect = !isTrueSelect && !isWrongSelect && index === select;
              const label = String.fromCharCode(65 + index);

              return (
                <div key={index} className="xs:w-full lg:w-6/12">
                  <div
                    onClick={() => {
                      if (!isSubmit) {
                        const checkResult = result.find((r) => r._id === item?._id);
                        if (checkResult && checkResult.isTrue !== isTrue)
                          setResult((pre) =>
                            pre.map((p) => {
                              if (checkResult._id === p._id) return { _id: p._id, isTrue };
                              else return { ...p };
                            })
                          );
                        else setResult((pre) => [...pre, { _id: item._id, isTrue }]);
                        setSelect(index);
                      }
                    }}
                    className={`card h-24 p-2 m-2 ${isSubmit ? 'cursor-auto' : 'cursor-pointer hover:bg-primary-100 hover:border-primary-700'} 
                    ${isTrueSelect ? 'bg-success-100 border-success-700' : isWrongSelect ? 'bg-danger-100 border-danger-700' : isSelect ? 'bg-primary-100 border-primary-700' : 'bg-white'}`}
                  >
                    {label}. {answer.label}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Question;

import {InputFormDetail, InputFormV2} from "@components/form";
import {BiTrash} from "react-icons/bi";
import {Button, Input} from "@components/uiCore";
import React from "react";

const Answers = (props) => {
    const {answers, setAnswers} = props;
    const onChange = (value, key) => {
        setAnswers(answers.map(p => {
            if (p.key === key) return {label: value, key}
            else return {...p}
        }))
    }
    const onDelete = (key) => {
        if (answers.length > 1) setAnswers(pre => pre.filter(p => p.key !== key))
    }
    const onAddAnswer = () => {
        setAnswers(pre => [...pre, {label: '', key: pre[pre.length - 1]?.key + 1}])
    }

    return (
        <div className='flex flex-wrap w-full items-center card m-2'>
            {answers && answers.length > 0 && answers.map((a, index) => (
                <div key={index} className={'flex justify-between items-center p-2 gap-2 xs:w-full lg:w-6/12'}>
                    <div className={`w-full`}>
                        <Input label={`Câu trả lời ${index + 1}`} value={a.label}
                               onChange={e => onChange(e.target.value, a.key)}/>
                    </div>
                    <Button rounded={true} severity="danger" onClick={() => onDelete(a.key)}>
                        <BiTrash size={16}/>
                    </Button>
                </div>
            ))}
            <div className={'w-full text-right p-2 mt-2'}>
                <Button onClick={onAddAnswer} disabled={answers.length >= 6}>
                    Thêm câu trả lời
                </Button>
            </div>
        </div>
    );
};

export default Answers;

import { InputFormDetail, SelectFormDetail, SwitchForm, TextAreaForm } from '@components/form';
import { QuestionValidation } from '@lib/validation';
import { yupResolver } from '@hookform/resolvers/yup';
import React, {useEffect, useState} from 'react';
import { useForm } from 'react-hook-form';
import { addQuestionApi, updateQuestionApi } from '@api';
import { FormDetail } from '@components/base';
import { checkEqualProp } from '@utils';
import Answers from "@view/admin/questions/Answers";

const defaultValues = {
  lessonId: '',
  content: '',
  answer: '',
  status: 1
};

const DetailQuestion = (props) => {
  const { show, setShow, setParams, data, lessons, lessonId } = props;
  const isUpdate = typeof show === 'string';
  const item = isUpdate ? data.find((d) => d._id === show) : {};
  const [answers, setAnswers] = useState([{ label: '', key: 1 }])

  const {
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset
  } = useForm({
    resolver: yupResolver(QuestionValidation),
    defaultValues: { ...defaultValues, lessonId }
  });

  useEffect(() => {
    if (isUpdate && item._id) {
      if (Array.isArray(item.answers) && item.answers) {
        setAnswers(item.answers.map((a, index) => ({ label: a.label, key: index + 1 })))
        const answer = item.answers.findIndex(a => a.isAnswer)
        if (answer >= 0) item.answer = answer + 1
      }
      for (const key in defaultValues) {
        setValue(key, item[key]);
      }
    }
  }, [item]);

  const handleData = (data) => {
    data.answers = []
    if (answers && answers.length && data.answer) {
        answers.forEach(a => {
          if (String(a.key) === data.answer) data.answers.push({ label: a.label, isAnswer: true })
          else data.answers.push({ label: a.label, isAnswer: false })
        })
    }
    const newData = { ...data, status: data.status ? 1 : 0, answer: undefined };
    if (isUpdate) return { ...checkEqualProp(newData, item), _id: show };
    else return newData;
  };

  return (
    <FormDetail
      title="bài giảng"
      show={show}
      setShow={() => {
        setShow(false);
        reset();
      }}
      isUpdate={isUpdate}
      insertApi={addQuestionApi}
      updateApi={updateQuestionApi}
      handleData={handleData}
      handleSubmit={handleSubmit}
      setParams={setParams}
    >
      <div className="flex flex-wrap w-full">
        <SelectFormDetail
            id="lessonId"
            label="Bài giảng (*)"
            data={lessons.map((c) => ({ label: c.title, key: c._id }))}
            watch={watch}
            setValue={setValue}
            errors={errors}
            disabled={lessonId}
        />
        <TextAreaForm id="content" label="Câu hỏi (*)" className="w-full p-2" watch={watch} setValue={setValue} errors={errors} />
        <Answers answers={answers} setAnswers={setAnswers} />
        <SelectFormDetail
            id="answer"
            label="Đáp án (*)"
            data={answers.filter(a => a.label && a.key)}
            watch={watch}
            setValue={setValue}
            errors={errors}
        />
        <SwitchForm id="status" label="Trạng thái (*)" watch={watch} setValue={setValue} />
      </div>
    </FormDetail>
  );
};

export default DetailQuestion;

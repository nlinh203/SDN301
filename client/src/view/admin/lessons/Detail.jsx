import { InputFormDetail, SelectFormDetail, SwitchForm, TextAreaForm, UploadFiles } from '@components/form';
import { LessonValidation } from '@lib/validation';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormDetail } from '@components/base';
import { checkEqualProp } from '@utils';
import { useParams } from 'react-router-dom';
import { TETabs, TETabsContent, TETabsItem, TETabsPane } from 'tw-elements-react';
import Questions from '@view/admin/lessons/Questions';
import DetailQuestion from '@view/admin/questions/Detail';
import {courses, lessons} from "../../../data";

const defaultValues = {
  courseId: '',
  title: '',
  code: '',
  author: '',
  time: 0,
  description: '',
  url: '',
  status: 1
};

const DetailLesson = () => {
  const { _id } = useParams();
  const [buttonActive, setButtonActive] = useState('tab1');
  const [files, setFiles] = useState([]);
  const [show, setShow] = useState(false);
  const isUpdate = Boolean(_id);
  const item = lessons.find(l => l._id === _id)

  const handleButtonClick = (value) => {
    if (value === buttonActive) {
      return;
    }
    setButtonActive(value);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    resolver: yupResolver(LessonValidation),
    defaultValues
  });

  useEffect(() => {
    if (item?.files?.length > 0) setFiles(item.files);
    if (isUpdate && item?._id) {
      for (const key in defaultValues) {
        setValue(key, item[key]);
      }
    }
  }, [item]);

  const handleData = (data) => {
    const newData = { ...data, status: data.status ? 1 : 0 };
    if (files && files.length > 0) {
      if (JSON.stringify(files) !== JSON.stringify(item?.files)) {
        const newFiles = [];
        const formData = [];
        files.forEach((f) => {
          if (item?.files.some((i) => JSON.stringify(i) === JSON.stringify(f))) newFiles.push(f);
          else formData.push(f);
        });
        if (newFiles.length > 0) newData.files = newFiles;
        if (formData.length > 0) newData.formData = { files: formData };
      }
    } else if (item?.files?.length > 0) newData.files = [];
    if (isUpdate) return { ...checkEqualProp(newData, item), _id };
    else return newData;
  };

  return (
    <>
      <DetailQuestion
        show={show}
        setShow={setShow}
        data={isUpdate && item?.questions}
        lessons={lessons}
        lessonId={_id}
      />
      <FormDetail
        type={'normal'}
        title="bài giảng"
        isUpdate={isUpdate}
        handleData={handleData}
        handleSubmit={handleSubmit}
      >
        <TETabs>
          <TETabsItem onClick={() => handleButtonClick('tab1')} active={buttonActive === 'tab1'}>
            Thông tin bài giảng
          </TETabsItem>
          <TETabsItem disabled={!isUpdate} onClick={() => handleButtonClick('tab2')} active={buttonActive === 'tab2'}>
            Danh sách câu hỏi
          </TETabsItem>
        </TETabs>
        <TETabsContent>
          <TETabsPane show={buttonActive === 'tab1'}>
            <div className={'flex flex-wrap'}>
              <div className="flex flex-wrap w-full">
                <SelectFormDetail
                  id="courseId"
                  label="Khóa học (*)"
                  data={courses.map((c) => ({ label: c.name, key: c._id }))}
                  watch={watch}
                  setValue={setValue}
                  errors={errors}
                />
                <InputFormDetail id="title" label="Tiêu đề (*)" register={register} errors={errors} />
                <InputFormDetail id="code" label="Mã bài giảng (*)" register={register} errors={errors} />
                <InputFormDetail id="author" label="Tác giả (*)" register={register} errors={errors} />
                <InputFormDetail type="number" id="time" label="Thời gian học (phút) (*)" register={register} errors={errors} />
                <InputFormDetail id="url" label="Video url (*)" register={register} errors={errors} />
                <div className='w-6/12'></div>
                <SwitchForm id="status" label="Trạng thái (*)" watch={watch} setValue={setValue} />
                <TextAreaForm id="description" label="Mô tả" className="w-full p-2" watch={watch} setValue={setValue} />
              </div>
              <div className={'w-full'}>
                <UploadFiles label={'File đính kèm'} files={files} setFiles={setFiles} />
              </div>
            </div>
          </TETabsPane>
          <TETabsPane show={buttonActive === 'tab2'}>
            <Questions data={isUpdate && item?.questions} setShow={setShow} />
          </TETabsPane>
        </TETabsContent>
      </FormDetail>
    </>
  );
};

export default DetailLesson;

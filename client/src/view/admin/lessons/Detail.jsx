import { InputFormDetail, SelectFormDetail, SwitchForm, TextAreaForm, UploadFiles } from '@components/form';
import { LessonValidation } from '@lib/validation';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { addLessonApi, detailLessonApi, getListLessonApi, getListLessonInfoApi, updateLessonApi } from '@api';
import { FormDetail } from '@components/base';
import { checkEqualProp } from '@utils';
import { useGetApi } from '@lib/react-query';
import { useParams } from 'react-router-dom';
import { TETabs, TETabsContent, TETabsItem, TETabsPane } from 'tw-elements-react';
import Questions from '@view/admin/lessons/Questions';
import { useDataState } from '@store';
import DetailQuestion from '@view/admin/questions/Detail';

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
  const { setLessons } = useDataState();
  const { _id } = useParams();
  const [buttonActive, setButtonActive] = useState('tab1');
  const [files, setFiles] = useState([]);
  const [filez, setFilez] = useState([]);
  const [params, setParams] = useState({ _id, render: false });
  const [show, setShow] = useState(false);
  const { courses, lessons } = useDataState();
  const isUpdate = Boolean(_id);
  const { data: item, isLoading } = useGetApi(detailLessonApi, params, 'lesson', isUpdate);

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
    setValue
  } = useForm({
    resolver: yupResolver(LessonValidation),
    defaultValues
  });

  useEffect(() => {
    if (item?.files?.length > 0) setFiles(item.files);
    if (item?.url) setFilez([item.url]);
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
    if (filez && filez[0] && !newData.url) {
      if (newData.formData) newData.formData = { ...newData.formData, url: filez[0] };
      else newData.formData = { url: filez[0] };
    }
    if (isUpdate) return { ...checkEqualProp(newData, item), _id };
    else return newData;
  };

  const onSuccess = async () => {
    const lessons = await getListLessonInfoApi();
    if (lessons) setLessons(lessons);
  };

  return (
    <>
      <DetailQuestion
        show={show}
        setShow={setShow}
        setParams={setParams}
        data={isUpdate && item?.questions}
        lessons={lessons}
        lessonId={_id}
      />
      <FormDetail
        type={'normal'}
        title="bài giảng"
        isUpdate={isUpdate}
        insertApi={addLessonApi}
        updateApi={updateLessonApi}
        handleData={handleData}
        handleSubmit={handleSubmit}
        onSuccess={onSuccess}
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
                <SwitchForm id="status" label="Trạng thái (*)" watch={watch} setValue={setValue} />
                <div className={'w-full card flex flex-col gap-2 justify-center items-center m-2'}>
                  <InputFormDetail id="url" label="Video url" register={register} errors={errors} className="!w-full" />
                  <h1 className="font-bold">Or</h1>
                  <UploadFiles label={'Video'} files={filez} setFiles={setFilez} max={1} type='video/' />
                </div>
                <div className="w-6/12"></div>
                <TextAreaForm id="description" label="Mô tả" className="w-full p-2" watch={watch} setValue={setValue} />
              </div>
              <div className={'w-full'}>
                <UploadFiles label={'File đính kèm'} files={files} setFiles={setFiles} />
              </div>
            </div>
          </TETabsPane>
          <TETabsPane show={buttonActive === 'tab2'}>
            <Questions data={isUpdate && item?.questions} isLoading={isLoading} setShow={setShow} />
          </TETabsPane>
        </TETabsContent>
      </FormDetail>
    </>
  );
};

export default DetailLesson;

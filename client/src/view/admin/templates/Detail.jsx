import { InputFormDetail, SwitchForm, TextAreaForm, UploadFiles } from '@components/form';
import { TemplateValidation } from '@lib/validation';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { addTemplateApi, detailTemplateApi, updateTemplateApi } from '@api';
import { FormDetail } from '@components/base';
import { checkEqualProp } from '@utils';
import Editor from '@components/uiCore/Editor';
import { useGetApi } from '@lib/react-query';

const defaultValues = {
  subject: '',
  code: '',
  content: '',
  description: '',
  status: 1
};

const DetailTemplate = (props) => {
  const { show, setShow, setParams = () => {} } = props;
  const [files, setFiles] = useState([]);
  const isUpdate = typeof show === 'string';
  const { data: item } = useGetApi(detailTemplateApi, { _id: show }, 'template', isUpdate);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset
  } = useForm({
    resolver: yupResolver(TemplateValidation),
    defaultValues
  });

  useEffect(() => {
    if (isUpdate && item._id) {
      if (item?.files?.length > 0) setFiles(item.files);
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
    if (isUpdate) return { ...checkEqualProp(newData, item), _id: show };
    else return newData;
  };

  return (
    <FormDetail
      title="template"
      show={show}
      setShow={() => {
        setShow(false);
        reset();
        setFiles([])
      }}
      isUpdate={isUpdate}
      insertApi={addTemplateApi}
      updateApi={updateTemplateApi}
      handleData={handleData}
      handleSubmit={handleSubmit}
      setParams={setParams}
    >
      <div className="flex flex-wrap text-left">
        <InputFormDetail id="subject" label="Tiêu đề (*)" register={register} errors={errors} className={'!w-full'} />
        <InputFormDetail id="code" label="Mã template (*)" register={register} errors={errors} className={'!w-full'} />
        <div className='w-6/12'></div>
        <SwitchForm id="status" label="Trạng thái (*)" watch={watch} setValue={setValue} />
        <TextAreaForm id="description" label="Mô tả" className="w-full p-2" watch={watch} setValue={setValue} />
        <Editor id="content" label="Nội dung (*)" data={watch('content')} setData={(e) => setValue('content', e)} />
        <div className={'w-full'}>
          <UploadFiles label={'File đính kèm'} files={files} setFiles={setFiles} />
        </div>
      </div>
    </FormDetail>
  );
};

export default DetailTemplate;

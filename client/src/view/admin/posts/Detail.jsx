import { UploadImage, InputFormDetail, TextAreaForm, MultiRadio } from '@components/form';
import { PostValidation } from '@lib/validation';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormDetail } from '@components/base';
import { checkEqualProp } from '@utils';
import Editor from '@components/uiCore/Editor';
import { postType } from '@constant';
import {posts} from "../../../data";

const defaultValues = {
  title: '',
  content: '',
  time: 0,
  hashtag: '',
  description: '',
  type: 'post'
};

const DetailPost = (props) => {
  const { show, setShow, setParams = () => {}, mode = 'web' } = props;
  const [image, setImage] = useState(null);
  const isUpdate = typeof show === 'string';
  const item = posts.find(p => p._id === show)

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset
  } = useForm({
    resolver: yupResolver(PostValidation),
    defaultValues
  });

  useEffect(() => {
    if (item?.hashtag && Array.isArray(item.hashtag)) item.hashtag = item?.hashtag?.join('; ');
    if (item?.image) setImage(item.image);
    if (isUpdate && item._id) {
      if (item.avatar) setImage(item.image);
      for (const key in defaultValues) {
        setValue(key, item[key]);
      }
    }
  }, [item]);

  const handleData = (data) => {
    const hashtag = data.hashtag?.split(';') || [];
    const newData = { ...data, hashtag };
    if (image) newData.formData = { image };
    else if (item?.image) newData.image = '';
    if (isUpdate) return { ...checkEqualProp(newData, item), _id: show };
    else return newData;
  };

  return (
    <FormDetail
      title="bài viết"
      show={show}
      setShow={() => {
        setShow(false);
        reset();
        setImage(null);
      }}
      isUpdate={isUpdate}
      handleData={handleData}
      handleSubmit={handleSubmit}
      setParams={setParams}
    >
      <div className="flex flex-wrap text-left">
        <div className="w-4/12 p-2">
          <UploadImage label="Ảnh mô tả" data={image} setData={setImage} />
        </div>
        <div className="w-8/12 flex flex-wrap">
          {mode === 'admin' && <MultiRadio data={postType} value={watch('type')} onChange={(e) => setValue('type', e)} />}
          <InputFormDetail id="title" label="Tiêu đề (*)" register={register} errors={errors} className={'!w-full'} />
          {watch('type') === 'post' && (
            <>
              <InputFormDetail
                type="number"
                id="time"
                label="Thời gian đọc (phút) (*)"
                register={register}
                errors={errors}
                className={'!w-full'}
              />
              <InputFormDetail id="hashtag" label="Hagtag" register={register} className={'!w-full'} />
            </>
          )}
          <TextAreaForm id="description" label="Mô tả" className="w-full p-2" watch={watch} setValue={setValue} />
        </div>
        <Editor id="content" label="Nội dung (*)" data={watch('content')} setData={(e) => setValue('content', e)} />
      </div>
    </FormDetail>
  );
};

export default DetailPost;

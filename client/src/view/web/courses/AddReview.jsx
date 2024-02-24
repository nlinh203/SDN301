import { TextAreaForm, UploadFiles } from '@components/form';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { addCourseReviewApi } from '@api';
import { FormDetail } from '@components/base';
import { Rating } from '@components/uiCore';

const AddReview = (props) => {
  const { show, setShow, setRender, courseId } = props;
  const [file, setFile] = useState([]);
  const [rating, setRating] = useState(5);

  const { handleSubmit, watch, setValue, reset } = useForm({
    defaultValues: { content: '' }
  });

  const handleData = (data) => {
    const newData = { ...data, rating, courseId };
    if (file?.length > 0) newData.formData = { file: file[0] };
    return newData;
  };

  return (
    <FormDetail
      size="lg"
      title="đánh giá"
      show={show}
      setShow={() => {
        setShow(false);
        reset();
        setFile(null);
        setRating(5)
      }}
      isUpdate={false}
      insertApi={addCourseReviewApi}
      handleData={handleData}
      handleSubmit={handleSubmit}
      setParams={() => setRender((pre) => !pre)}
    >
      <div className="flex flex-wrap">
        <div className="card m-2 w-full flex justify-center">
          <Rating size={6} value={rating} setValue={setRating} />
        </div>
        <TextAreaForm id="content" label="Nội dung" className="w-full p-2" watch={watch} setValue={setValue} />
        <UploadFiles label="File đính kèm" files={file} setFiles={setFile} max={1} />
      </div>
    </FormDetail>
  );
};

export default AddReview;

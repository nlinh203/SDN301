import React, { useEffect, useState } from 'react';
import { Button, Hr, Modal } from '@components/uiCore';
import Question from './Question';
import { useConfirmState, useToastState } from '@store';
import { completeLessonApi } from '@api';

const AnswerQuestion = (props) => {
  const { show, setShow, data, courseId, lessonId, setRender } = props;
  const { showConfirm, show: showz } = useConfirmState();
  const { showToast } = useToastState();
  const [isSubmit, setIsSubmit] = useState(false);
  const [result, setResult] = useState([]);
  const trueQuestion = result.filter((r) => r.isTrue) || [];
  const ratio = Math.round((trueQuestion?.length / data?.length) * 100);

  const onSubmit = () => {
    const title =
      result.length === data.length
        ? 'Bạn có chắc chắn muốn nộp bài!'
        : `Bạn còn ${data.length - result.length} câu hỏi chưa chọn, bạn có chắc chắn muốn nộp bài!`;
    showConfirm({
      title,
      action: async () => {
        if (ratio >= 80) {
          const response = await completeLessonApi({ courseId, lessonId });
          if (response) setRender((pre) => !pre);
        }
        setIsSubmit(true);
        showToast({ title: 'Nộp bài thành công!', severity: 'success' });
      }
    });
  };

  useEffect(() => {
    setIsSubmit(false);
    setResult([]);
  }, [lessonId]);

  return (
    <Modal
      title="Trả lời câu hỏi"
      size="lg"
      show={show}
      setShow={setShow}
      wrapper={`fixed left-0 top-0 ${showz ? 'z-[1040]' : 'z-[1050]'} h-full w-full overflow-y-auto overflow-x-hidden outline-none`}
    >
      {isSubmit && (
        <>
          <div className="p-6 flex flex-col gap-2">
            <span className="uppercase font-semibold mb-2">Kết quả:</span>
            <div className="card flex justify-around uppercase font-semibold text-lg">
              <span className="text-success-600 py-1 px-4 rounded-lg bg-success-50">Đúng: {trueQuestion?.length}</span>
              <span className="text-danger-600 py-1 px-4 rounded-lg bg-danger-50">Sai: {data?.length - trueQuestion?.length}</span>
              <span className={`py-1 px-4 rounded-lg ${ratio >= 80 ? 'text-success-600 bg-success-50' : 'text-danger-600 bg-danger-50'}`}>
                Tỉ lệ: {ratio}%
              </span>
            </div>
            <span className="pt-2">
              {ratio >= 80
                ? 'Xin chúc mừng bạn đã hoàn thành bài kiểm tra và mở khóa được bài học tiếp theo!'
                : 'Kết quả bài kiểm tra của bạn chưa đủ để mở khóa bài học tiếp theo!'}
            </span>
          </div>
          <Hr />
        </>
      )}
      <div className={`p-6 flex flex-col gap-8 ${isSubmit ? 'h-[50vh]' : 'h-[70vh]'} overflow-scroll`}>
        {data?.length > 0 &&
          data.map((item, index) => (
            <Question key={index} index={index} item={item} total={data.length} isSubmit={isSubmit} result={result} setResult={setResult} />
          ))}
      </div>
      <Hr />
      <div className="flex gap-2 justify-end px-6 py-4">
        <Button label="Bỏ qua" severity="secondary" onClick={() => setShow(false)} />
        <Button disabled={isSubmit} onClick={onSubmit} severity="danger" type="submit" label="Nộp bài" />
        <Button
          disabled={!isSubmit}
          label="Làm lại"
          onClick={() => {
            setIsSubmit(false);
            setResult([]);
          }}
        />
      </div>
    </Modal>
  );
};

export default AnswerQuestion;

import { addQuestionValid, updateQuestionValid, detailQuestionValid, listQuestionValid, exportQuestionValid } from '@lib/validation';
import { addQuestionMd, deleteQuestionMd, getDetailLessonMd, getDetailQuestionMd, updateLessonMd, updateQuestionMd } from '@models';
import { validateData } from '@utils';
import { convertToExcel, handleFileExcel } from '@lib/excel-js';
import { getListQuestionRepo } from '@repository';
import moment from 'moment';

export const getListQuestion = async (req, res) => {
  try {
    const { error, value } = validateData(listQuestionValid, req.query);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { data, mess } = await getListQuestionRepo(value);
    if (data && !mess) res.json({ status: true, data });
    else res.status(400).json({ status: false, mess });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const detailQuestion = async (req, res) => {
  try {
    const { error, value } = validateData(detailQuestionValid, req.query);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { _id } = value;
    const data = await getDetailQuestionMd({ _id });
    if (!data) return res.status(400).json({ status: false, mess: 'Câu hỏi không tồn tại!' });
    res.json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const deleteQuestion = async (req, res) => {
  try {
    const { error, value } = validateData(detailQuestionValid, req.body);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { _id } = value;
    const question = await getDetailQuestionMd({ _id });
    if (!question) return res.status(400).json({ status: false, mess: 'Câu hỏi không tồn tại!' });
    const data = await deleteQuestionMd({ _id });
    await updateLessonMd({ _id: question.lessonId }, { $pull: { questions: _id } });
    res.status(201).json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const addQuestion = async (req, res) => {
  try {
    const { error, value } = validateData(addQuestionValid, req.body);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { lessonId, content, answers, status } = value;

    const checkContent = await getDetailQuestionMd({ content });
    if (checkContent) return res.status(400).json({ status: false, mess: 'Câu hỏi đã tồn tại!' });

    const checkLesson = await getDetailLessonMd({ _id: lessonId, status: 1 });
    if (!checkLesson) return res.status(400).json({ status: false, mess: 'Bài giảng không tồn tại!' });

    const data = await addQuestionMd({
      by: req.userInfo._id,
      content,
      answers,
      lessonId,
      status
    });

    await updateLessonMd({ _id: checkLesson._id }, { $addToSet: { questions: data._id } });
    res.status(201).json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const updateQuestion = async (req, res) => {
  try {
    const { error, value } = validateData(updateQuestionValid, req.body);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { _id, lessonId, content, answers, status } = value;

    const question = await getDetailQuestionMd({ _id });
    if (!question) return res.status(400).json({ status: false, mess: 'Câu hỏi không tồn tại!' });

    if (content) {
      const checkContent = await getDetailQuestionMd({ content });
      if (checkContent) return res.status(400).json({ status: false, mess: 'Câu hỏi đã tồn tại!' });
    }

    if (lessonId) {
      const checkLesson = await getDetailLessonMd({ id: lessonId, status: 1 });
      if (!checkLesson) return res.status(400).json({ status: false, mess: 'Bài giảng không tồn tại!' });
      await updateLessonMd({ _id: checkLesson._id }, { $addToSet: { questions: _id } });
      await updateLessonMd({ _id: question.lessonId }, { $pull: { questions: _id } });
    }

    const data = await updateQuestionMd({ _id }, { updateBy: req.userInfo._id, content, answers, lessonId, status });
    res.status(201).json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const importQuestion = async (req, res) => {
  try {
    if (req.file) {
      const attributes = ['stt', 'lessonCode', 'content', 'answers', 'answer'];
      const data = await handleFileExcel(req.file, attributes);
      if (data && data.length > 0) {
        for (let datum of data) {
          const { stt, lessonCode, content, answers, answer } = datum;
          if (!stt) {
            datum.mess = 'Số thứ tự không được bỏ trống';
            continue;
          }
          if (!lessonCode) {
            datum.mess = 'Mã bài giảng không được bỏ trống';
            continue;
          }
          if (!content) {
            datum.mess = 'Câu hỏi không được bỏ trống';
            continue;
          }
          if (!answers) {
            datum.mess = 'Câu trả lời không được bỏ trống';
            continue;
          }
          if (!answer) {
            datum.mess = 'Đáp án không được bỏ trống';
            continue;
          }
          const array = answers.replace(/ /g, '').split(';') || [];
          const newAnswers = array.filter((a) => a);
          if (!newAnswers.includes(String(answer))) {
            datum.mess = `Đáp án ${answer} không tìm thấy`;
            continue;
          }
          const checkLesson = await getDetailLessonMd({ code: lessonCode });
          if (!checkLesson) {
            datum.mess = `Không tìm thấy bài giảng có mã ${lessonCode}`;
            continue;
          }
          const checkContent = await getDetailQuestionMd({ content });
          if (checkContent) {
            datum.mess = `Câu hỏi đã tồn tại`;
            continue;
          }
          const question = await addQuestionMd({
            by: req.userInfo._id,
            content,
            answers: newAnswers.map((n) => ({ label: n, isAnswer: n === String(answer) })),
            lessonId: checkLesson._id,
            status: 1
          });
          await updateLessonMd({ _id: checkLesson._id }, { $addToSet: { questions: question._id } });
        }
      }
      const newData = [];
      newData.push(['STT', 'Mã bài giảng', 'Câu hỏi', 'Câu trả lời', 'Đáp án', 'Kết quả', 'Nội dung']);
      if (data && data.length > 0) {
        for (let datum of data) {
          newData.push([
            datum.stt,
            datum.lessonCode,
            datum.content,
            datum.answers,
            datum.answer,
            datum.mess ? 'Thất bại' : 'Thành công',
            datum.mess || 'Thêm câu hỏi thành công'
          ]);
        }
      }
      res
        .status(200)
        .attachment('file.xlsx')
        .send(await convertToExcel(newData, { fromRow: 0 }));
    } else res.status(400).json({ status: false, mess: 'Vui lòng truyền file excel!' });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const exportQuestion = async (req, res) => {
  try {
    const { error, value } = validateData(exportQuestionValid, req.query);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { data, mess } = await getListQuestionRepo(value);
    if (data && !mess) {
      const documents = data.documents;
      const newData = [];
      newData.push([
        'STT',
        'Bài giảng',
        'Mã bài giảng',
        'Câu hỏi',
        'Câu trả lời',
        'Đáp án',
        'Thời gian tạo',
        'Thời gian cập nhật',
        'Trạng thái'
      ]);
      if (documents && documents.length > 0) {
        let index = 1;
        for (let datum of documents) {
          const lesson = (await getDetailLessonMd({ _id: datum.lessonId })) || {};
          let answers = '';
          let answer = '';
          if (Array.isArray(datum.answers) && datum.answers.length > 0) {
            datum.answers.forEach((a, index) => {
              const key = String.fromCharCode(65 + index);
              answers += `${key}. ${a.label}; `;
              if (a.isAnswer) answer = `${key}. ${a.label}`;
            });
          }
          newData.push([
            index,
            lesson.title,
            lesson.code,
            datum.content,
            answers,
            answer,
            datum.createdAt ? moment(datum.createdAt).format('DD/MM/YYYY HH:mm:ss') : '',
            datum.updatedAt ? moment(datum.updatedAt).format('DD/MM/YYYY HH:mm:ss') : '',
            datum.status === 1 ? 'Active' : 'Inactive'
          ]);
        }
      }
      res
        .status(200)
        .attachment('file.xlsx')
        .send(await convertToExcel(newData, { fromRow: 0 }));
    } else res.status(400).json({ status: false, mess });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

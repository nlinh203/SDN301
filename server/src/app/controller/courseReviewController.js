import { uploadFileToFirebase } from '@lib/firebase';
import { addCourseReviewValid, deleteCourseReviewValid, listCourseReviewValid } from '@lib/validation';
import {
  addCourseReviewMd,
  countListCourseReviewMd,
  deleteCourseReviewMd,
  getDetailCourseReviewMd,
  getListCourseReviewMd,
  updateCourseMd
} from '@models';
import { validateData } from '@utils';

export const getListCourseReview = async (req, res) => {
  try {
    const { error, value } = validateData(listCourseReviewValid, req.query);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { page, limit, courseId, rating } = value;
    const where = {};
    if (courseId) where.courseId = courseId;
    if (rating) where.rating = rating;
    const documents = await getListCourseReviewMd(where, page, limit, [{ path: 'by', select: 'fullName role' }]);
    const total = await countListCourseReviewMd(where);
    res.json({ status: true, data: { documents, total } });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const addCourseReview = async (req, res) => {
  try {
    const { error, value } = validateData(addCourseReviewValid, req.body);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { courseId, rating, content } = value;
    let file;
    if (req.file) {
      file = await uploadFileToFirebase(req.file);
    }

    const checkUser = await getDetailCourseReviewMd({ courseId, by: req.userInfo._id });
    if (checkUser) res.status(400).json({ status: false, mess: 'Tài khoản này đã đánh giá khóa học!' });

    const data = await addCourseReviewMd({ by: req.userInfo._id, courseId, rating, content, file });
    const listCourseReview = await getListCourseReviewMd({ courseId });
    const total =
      listCourseReview.reduce((total, currentValue) => {
        return total + currentValue.rating;
      }, 0) / listCourseReview.length;
    await updateCourseMd({ _id: courseId }, { rating: total.toFixed(1), $addToSet: { reviews: data._id } });
    res.json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const deleteCourseReview = async (req, res) => {
  try {
    const { error, value } = validateData(deleteCourseReviewValid, req.body);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { _id } = value;

    const CourseReview = await getDetailCourseReviewMd({ _id });
    if (!CourseReview) return res.status(400).json({ status: false, mess: 'Đánh giá không tồn tại!' });

    if (req.userInfo.role !== 'admin' && CourseReview.by !== req.userInfo._id)
      return res.status(400).json({
        status: false,
        mess: 'Bạn không có quyền xóa đánh giá này!'
      });

    const data = await deleteCourseReviewMd({ _id });
    const listCourseReview = await getListCourseReviewMd({ courseId: CourseReview.courseId });
    const total =
      listCourseReview.length > 0
        ? listCourseReview.reduce((total, currentValue) => {
            return total + currentValue.rating;
          }, 0) / listCourseReview.length
        : 5;
    await updateCourseMd({ _id: CourseReview.courseId }, { rating: total.toFixed(1), $pull: { reviews: _id } });
    res.status(201).json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

import mongoose from 'mongoose';
import { ModelBase } from '@config';
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

class CourseReviewMd extends ModelBase {
  by;
  courseId;
  rating;
  content;
  file;
  likes;
  deletedAt;
}

CourseReviewMd.init('CourseReview', {
  by: { type: ObjectId, ref: 'User', required: true },
  courseId: { type: ObjectId, ref: 'Course', required: true },
  rating: { type: Number, enum: [1, 2, 3, 4, 5], required: true },
  content: { type: String },
  file: { type: String },
  likes: [{ type: ObjectId, ref: 'User' }],
  deletedAt: { type: Date }
});

export const getListCourseReviewMd = (where, page, limit, populates, sort, attr) => {
  return CourseReviewMd.find({ where, page, limit, sort, attr, populates });
};

export const countListCourseReviewMd = (where) => {
  return CourseReviewMd.count({ where });
};

export const getDetailCourseReviewMd = (where, populates, attr) => {
  return CourseReviewMd.findOne({ where, attr, populates });
};

export const addCourseReviewMd = (attr) => {
  return CourseReviewMd.create({ attr });
};

export const updateCourseReviewMd = (where, attr) => {
  return CourseReviewMd.update({ where, attr });
};

export const deleteCourseReviewMd = (where) => {
  return CourseReviewMd.delete({ where });
};

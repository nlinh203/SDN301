import mongoose from 'mongoose';
import { ModelBase } from '@config';
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

class LessonMd extends ModelBase {
  by;
  courseId;
  updateBy;
  title;
  code;
  url;
  author;
  time;
  description;
  files;
  status;
  deletedAt;
}

LessonMd.init('Lesson', {
  by: { type: ObjectId, ref: 'User', required: true },
  courseId: { type: ObjectId, ref: 'Course', required: true },
  updateBy: { type: ObjectId, ref: 'User' },
  title: { type: String, required: true, unique: true },
  code: { type: String, required: true },
  url: { type: String, required: true },
  author: { type: String, required: true },
  time: { type: Number, default: 0, min: 0 },
  description: { type: String },
  files: [{ type: String }],
  questions: [{ type: ObjectId, ref: 'Question' }],
  status: { type: Number, enum: [0, 1], default: 1 },
  deletedAt: { type: Date }
});

export const getListLessonMd = (where, page, limit, populates, sort, attr) => {
  return LessonMd.find({ where, page, limit, sort, attr, populates });
};

export const countListLessonMd = (where) => {
  return LessonMd.count({ where });
};

export const getDetailLessonMd = (where, populates, attr) => {
  return LessonMd.findOne({ where, attr, populates });
};

export const addLessonMd = (attr) => {
  return LessonMd.create({ attr });
};

export const updateLessonMd = (where, attr) => {
  return LessonMd.update({ where, attr });
};

export const deleteLessonMd = (where) => {
  return LessonMd.delete({ where });
};

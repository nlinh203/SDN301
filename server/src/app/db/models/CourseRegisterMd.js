import mongoose from 'mongoose';
import { ModelBase } from '@config';
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

class CourseRegisterMd extends ModelBase {
  by;
  course;
  price;
  qr;
  lessons;
  status;
  deletedAt;
}

CourseRegisterMd.init('CourseRegister', {
  by: { type: ObjectId, ref: 'User', required: true },
  course: { type: ObjectId, ref: 'Course', required: true },
  price: { type: Number, default: 0 },
  qr: { type: String },
  lessons: [
    {
      lesson: { type: ObjectId, ref: 'Lesson', required: true },
      status: { type: String, default: 'isLocked', enum: ['isStudy', 'isLocked', 'isCompleted'] }
    }
  ],
  status: { type: Number, enum: [0, 1, 2], required: true, description: '0: Chờ thanh toán, 1: Đang học, 2: Hoàn thành' },
  deletedAt: { type: Date }
});

export const getListCourseRegisterMd = (where, page, limit, populates, sort, attr) => {
  return CourseRegisterMd.find({ where, page, limit, sort, attr, populates });
};

export const countListCourseRegisterMd = (where) => {
  return CourseRegisterMd.count({ where });
};

export const getDetailCourseRegisterMd = (where, populates, attr) => {
  return CourseRegisterMd.findOne({ where, attr, populates });
};

export const addCourseRegisterMd = (attr) => {
  return CourseRegisterMd.create({ attr });
};

export const updateCourseRegisterMd = (where, attr) => {
  return CourseRegisterMd.update({ where, attr });
};

export const deleteCourseRegisterMd = (where) => {
  return CourseRegisterMd.delete({ where });
};

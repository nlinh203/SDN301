import mongoose from 'mongoose';
import { ModelBase } from '@config';
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

class CourseMd extends ModelBase {
  by;
  updateBy;
  name;
  code;
  slug;
  type;
  price;
  sale;
  isHot;
  isNew;
  image;
  description;
  rating;
  skills;
  requirements;
  lessons;
  questions;
  reviews;
  status;
  deletedAt;
}

CourseMd.init('Course', {
  by: { type: ObjectId, ref: 'User', required: true },
  updateBy: { type: ObjectId, ref: 'User' },
  name: { type: String, required: true, unique: true },
  code: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true },
  type: {
    type: Number,
    enum: [1, 2, 3, 4, 5, 6],
    required: true,
    description: '1: Ngoại ngữ, 2: CNTT - Lập trình, 3: Kỹ năng đời sống, 4: Thiết kế, 5: Thể thao - Sức khỏe, 6: Kinh doanh - Khởi nghiệp'
  },
  price: { type: Number, default: 0, min: 0 },
  sale: { type: Number, default: 0, min: 0 },
  isHot: { type: Boolean, default: false },
  isNew: { type: Boolean, default: false },
  image: { type: String },
  rating: { type: Number, default: 5 },
  description: { type: String },
  skills: [{ type: String }],
  requirements: [{ type: String }],
  lessons: [{ type: ObjectId, ref: 'Lesson' }],
  reviews: [{ type: ObjectId, ref: 'CourseReview' }],
  status: { type: Number, enum: [0, 1], default: 1 },
  deletedAt: { type: Date }
});

export const getListCourseMd = (where, page, limit, populates, sort, attr) => {
  return CourseMd.find({ where, page, limit, sort, attr, populates });
};

export const countListCourseMd = (where) => {
  return CourseMd.count({ where });
};

export const getDetailCourseMd = (where, populates, attr) => {
  return CourseMd.findOne({ where, attr, populates });
};

export const addCourseMd = (attr) => {
  return CourseMd.create({ attr });
};

export const updateCourseMd = (where, attr) => {
  return CourseMd.update({ where, attr });
};

export const deleteCourseMd = (where) => {
  return CourseMd.delete({ where });
};

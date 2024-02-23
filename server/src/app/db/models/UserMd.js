import mongoose from 'mongoose';
import { ModelBase } from '@config';
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

class UserMd extends ModelBase {
  fullName;
  username;
  email;
  password;
  bio;
  address;
  avatar;
  token;
  role;
  courses;
  posts;
  saves;
  status;
  deletedAt;
}

UserMd.init('User', {
  fullName: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  bio: { type: String },
  address: { type: String },
  avatar: { type: String },
  token: { type: String },
  role: { type: String, default: 'user' },
  courses: [{ type: ObjectId, ref: 'CourseRegister' }],
  posts: [{ type: ObjectId, ref: 'Post' }],
  saves: [{ type: ObjectId, ref: 'Post' }],
  status: { type: Number, enum: [0, 1], default: 1 },
  deletedAt: { type: Date }
});

export const getListUserMd = (where, page, limit, populates, sort, attr) => {
  return UserMd.find({ where, page, limit, sort, attr, populates });
};

export const countListUserMd = (where) => {
  return UserMd.count({ where });
};

export const getDetailUserMd = (where, populates, attr) => {
  return UserMd.findOne({ where, attr, populates });
};

export const addUserMd = (attr) => {
  return UserMd.create({ attr });
};

export const updateUserMd = (where, attr) => {
  return UserMd.update({ where, attr });
};

export const deleteUserMd = (where) => {
  return UserMd.delete({ where });
};

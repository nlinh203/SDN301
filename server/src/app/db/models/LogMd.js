import mongoose from 'mongoose';
import { ModelBase } from '@config';
const Schema = mongoose.Schema;

class LogMd extends ModelBase {
  to;
  title;
  content;
  type;
  status;
  mess;
  deletedAt;
}

LogMd.init('Log', {
  to: { type: String, required: true },
  subject: { type: String, required: true },
  content: { type: String, required: true },
  type: {
    type: Number,
    enum: [1, 2, 3, 4, 5],
    required: true,
    description: '1: Đăng ký tài khoản, 2: Quên mật khẩu, 3: Đăng ký khóa học thành công, 4: Thanh toán thành công, 5: Hoàn thành khóa học'
  },
  status: {
    type: Number,
    enum: [0, 1, 2],
    required: true,
    description: '0: Đang gửi, 1: Đã gửi, 2: Có lỗi'
  },
  mess: { type: String },
  deletedAt: { type: Date }
});

export const getListLogMd = (where, page, limit, populates, sort, attr) => {
  return LogMd.find({ where, page, limit, sort, attr, populates });
};

export const countListLogMd = (where) => {
  return LogMd.count({ where });
};

export const getDetailLogMd = (where, populates, attr) => {
  return LogMd.findOne({ where, attr, populates });
};

export const addLogMd = (attr) => {
  return LogMd.create({ attr });
};

export const updateLogMd = (where, attr) => {
  return LogMd.update({ where, attr });
};

export const deleteLogMd = (where) => {
  return LogMd.delete({ where });
};

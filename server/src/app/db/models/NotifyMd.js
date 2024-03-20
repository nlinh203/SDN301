import mongoose from 'mongoose';
import { ModelBase } from '@config';
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

class NotifyMd extends ModelBase {
  fromBy;
  by;
  to;
  content;
  type;
  objectId;
  status;
  data;
  deletedAt;
}

NotifyMd.init('Notify', {
  fromBy: {
    type: Number,
    enum: [1, 2],
    required: true,
    description: '1: Thông báo từ hệ thống, 2: Thông báo từ người dùng'
  },
  by: { type: ObjectId, ref: 'User' },
  to: { type: String, required: true },
  content: { type: String, required: true },
  type: {
    type: Number,
    enum: [1, 2, 3, 4, 5, 6, 7],
    required: true,
    description:
      '1: Like bài viết, 2: Thêm bình luận, 3: Trả lời bình luận, 4: Đăng ký khóa học, 5: Đặt câu hỏi trong bài học, 6: Hoàn thành bài học, 7: Thêm bài viết cần duyệt'
  },
  objectId: { type: ObjectId },
  status: {
    type: Number,
    enum: [0, 1, 2],
    default: 0,
    description: '0: Chưa xem, 1: Xem nhưng chưa đọc, 2: Đã đọc'
  },
  data: { type: Object },
  deletedAt: { type: Date }
});

export const getListNotifyMd = (where, page, limit, populates, sort, attr) => {
  return NotifyMd.find({ where, page, limit, sort, attr, populates });
};

export const countListNotifyMd = (where) => {
  return NotifyMd.count({ where });
};

export const getDetailNotifyMd = (where, populates, attr) => {
  return NotifyMd.findOne({ where, attr, populates });
};

export const addNotifyMd = (attr) => {
  return NotifyMd.create({ attr });
};

export const updateNotifyMd = (where, attr) => {
  return NotifyMd.update({ where, attr });
};

export const updateManyNotifyMd = (where, attr) => {
  return NotifyMd.updateMany({ where, attr });
};

export const deleteNotifyMd = (where) => {
  return NotifyMd.delete({ where });
};

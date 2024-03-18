import mongoose from 'mongoose';
import { ModelBase } from '@config';
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

class CommentMd extends ModelBase {
  by;
  content;
  file;
  likes;
  type;
  status;
  parentId;
  objectId;
  deletedAt;
}

CommentMd.init('Comment', {
  by: { type: ObjectId, ref: 'User', required: true },
  content: { type: String },
  file: { type: String },
  likes: [{ type: ObjectId, ref: 'User' }],
  type: {
    type: Number,
    enum: [1, 2, 3],
    required: true,
    description: '1: Bình luận bài viết, 2: Câu hỏi trong bài học'
  },
  status: {
    type: Number,
    enum: [0, 1, 2],
    default: 0,
    description: '0: Chờ trả lời, 1: Đã tiếp nhận, 2: Đã xử lý'
  },
  parentId: { type: String },
  objectId: { type: String },
  deletedAt: { type: Date }
});

export const getListCommentMd = (where, page, limit, populates, sort, attr) => {
  return CommentMd.find({ where, page, limit, sort, attr, populates });
};

export const countListCommentMd = (where) => {
  return CommentMd.count({ where });
};

export const getDetailCommentMd = (where, populates, attr) => {
  return CommentMd.findOne({ where, attr, populates });
};

export const addCommentMd = (attr) => {
  return CommentMd.create({ attr });
};

export const updateCommentMd = (where, attr) => {
  return CommentMd.update({ where, attr });
};

export const deleteCommentMd = (where) => {
  return CommentMd.delete({ where });
};

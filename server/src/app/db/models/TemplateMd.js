import mongoose from 'mongoose';
import { ModelBase } from '@config';
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

class TemplateMd extends ModelBase {
  by;
  updateBy;
  subject;
  code;
  content;
  description;
  status;
  files;
  deletedAt;
}

TemplateMd.init('Template', {
  by: { type: ObjectId, ref: 'User', required: true },
  updateBy: { type: ObjectId, ref: 'User' },
  subject: { type: String, required: true },
  code: { type: String, required: true },
  content: { type: String, required: true },
  description: { type: String },
  status: { type: Number, default: 1 },
  files: [{ type: String, require: true }],
  deletedAt: { type: Date }
});

export const getListTemplateMd = (where, page, limit, populates, sort, attr) => {
  return TemplateMd.find({ where, page, limit, sort, attr, populates });
};

export const countListTemplateMd = (where) => {
  return TemplateMd.count({ where });
};

export const getDetailTemplateMd = (where, populates, attr) => {
  return TemplateMd.findOne({ where, attr, populates });
};

export const addTemplateMd = (attr) => {
  return TemplateMd.create({ attr });
};

export const updateTemplateMd = (where, attr) => {
  return TemplateMd.update({ where, attr });
};

export const deleteTemplateMd = (where) => {
  return TemplateMd.delete({ where });
};

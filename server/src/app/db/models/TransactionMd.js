import mongoose from 'mongoose';
import { ModelBase } from '@config';
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

class TransactionMd extends ModelBase {
  by;
  updateBy;
  userId;
  customerInfo;
  transferInfo;
  status;
  deletedAt;
}

TransactionMd.init('Transaction', {
  by: { type: ObjectId, ref: 'User', required: true },
  updateBy: { type: ObjectId, ref: 'User' },
  userId: { type: ObjectId, ref: 'User', required: true },
  customerInfo: { type: Object, required: true },
  transferInfo: { type: Object, required: true },
  status: { type: Number, enum: [0, 1], default: 1 },
  deletedAt: { type: Date }
});

export const getListTransactionMd = (where, page, limit, populates, sort, attr) => {
  return TransactionMd.find({ where, page, limit, sort, attr, populates });
};

export const countListTransactionMd = (where) => {
  return TransactionMd.count({ where });
};

export const getDetailTransactionMd = (where, populates, attr) => {
  return TransactionMd.findOne({ where, attr, populates });
};

export const addTransactionMd = (attr) => {
  return TransactionMd.create({ attr });
};

export const updateTransactionMd = (where, attr) => {
  return TransactionMd.update({ where, attr });
};

export const deleteTransactionMd = (where) => {
  return TransactionMd.delete({ where });
};

export const listCommentLessonValid = {
  page: 'number',
  limit: 'number',
  fromDate: { type: 'date', allowNull: true },
  toDate: { type: 'date', allowNull: true },
  status: { type: 'number', allowNull: true }
};

export const listCommentValid = {
  type: 'number',
  objectId: 'string',
  parentId: { type: 'string', allowNull: true },
  status: { type: 'number', allowNull: true }
};

export const addCommentValid = {
  type: 'number',
  objectId: 'string',
  parentId: { type: 'string', allowNull: true },
  content: { type: 'string', allowNull: true }
};

export const deleteCommentValid = {
  _id: 'string'
};

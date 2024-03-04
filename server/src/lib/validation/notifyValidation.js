export const listNotifyValid = {
  page: 'number',
  limit: { type: 'number', allowNull: true },
  status: { type: 'number', allowNull: true }
};

export const updateNotifyValid = {
  _id: 'string',
  status: 'number'
};

export const readAllNotifyValid = {
  status: 'number'
};

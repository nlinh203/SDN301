export const listCourseValid = {
  page: 'number',
  limit: 'number',
  keySearch: { type: 'string', allowNull: true },
  fromPrice: { type: 'number', allowNull: true },
  toPrice: { type: 'number', allowNull: true },
  type: { type: 'number', allowNull: true },
  status: { type: 'number', allowNull: true }
};

export const listCourseWebValid = {
  page: 'number',
  limit: 'number',
  keySearch: { type: 'string', allowNull: true },
  fromPrice: { type: 'number', allowNull: true },
  toPrice: { type: 'number', allowNull: true },
  rating: { type: 'number', allowNull: true },
  type: { type: 'json', allowNull: true },
  sort: { type: 'json', allowNull: true },
  characteristic: { type: 'json', allowNull: true }
};

export const listSearchValid = {
  keySearch: 'string'
};

export const detailCourseValid = {
  _id: 'string'
};

export const detailCourseWebValid = {
  slug: 'string'
};

export const addCourseValid = {
  name: 'string',
  code: 'string',
  description: { type: 'string', allowNull: true },
  skills: { type: 'json', allowNull: true },
  requirements: { type: 'json', allowNull: true },
  price: { type: 'number', allowNull: true },
  sale: { type: 'number', allowNull: true },
  type: { type: 'number', allowNull: true },
  isHot: { type: 'boolean', allowNull: true },
  isNew: { type: 'boolean', allowNull: true },
  status: { type: 'number', allowNull: true },
  trailer: { type: 'string', allowNull: true },
};

export const updateCourseValid = {
  _id: 'string',
  name: { type: 'string', allowNull: true },
  code: { type: 'string', allowNull: true },
  description: { type: 'string', allowNull: true },
  skills: { type: 'json', allowNull: true },
  requirements: { type: 'json', allowNull: true },
  price: { type: 'number', allowNull: true },
  sale: { type: 'number', allowNull: true },
  type: { type: 'number', allowNull: true },
  isHot: { type: 'boolean', allowNull: true },
  isNew: { type: 'boolean', allowNull: true },
  status: { type: 'number', allowNull: true },
  image: { type: 'string', allowNull: true },
  trailer: { type: 'string', allowNull: true },
};

export const registerCourseValid = {
  courseId: 'string'
};

export const detailCourseRegisterValid = {
  slug: 'string'
};

export const detailLessonRegisterValid = {
  courseId: 'string',
  lessonId: 'string'
};

import { REGEX } from '@constant';

export const listLessonValid = {
  page: 'number',
  limit: 'number',
  keySearch: { type: 'string', allowNull: true },
  courseId: { type: 'string', allowNull: true },
  status: { type: 'number', allowNull: true }
};

export const detailLessonValid = {
  _id: 'string'
};

export const addLessonValid = {
  title: 'string',
  code: 'string',
  url: { type: 'string', pattern: REGEX.YOUTUBE_URL, allowNull: true },
  author: 'string',
  courseId: 'string',
  time: { type: 'number', allowNull: true },
  description: { type: 'string', allowNull: true },
  status: { type: 'number', allowNull: true }
};

export const updateLessonValid = {
  _id: 'string',
  title: { type: 'string', allowNull: true },
  code: { type: 'string', allowNull: true },
  url: { type: 'string', pattern: REGEX.YOUTUBE_URL, allowNull: true },
  author: { type: 'string', allowNull: true },
  courseId: { type: 'string', allowNull: true },
  time: { type: 'number', allowNull: true },
  description: { type: 'string', allowNull: true },
  status: { type: 'number', allowNull: true },
  files: { type: 'json', allowNull: true }
};

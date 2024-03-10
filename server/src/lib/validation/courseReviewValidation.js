export const listCourseReviewValid = {
  page: 'number',
  limit: 'number',
  courseId: { type: 'string', allowNull: true },
  rating: { type: 'number', allowNull: true }
};

export const listCourseReviewWebValid = {
  courseId: 'string',
  rating: { type: 'number', allowNull: true }
};

export const addCourseReviewValid = {
  courseId: 'string',
  rating: 'number',
  content: { type: 'string', allowNull: true }
};

export const deleteCourseReviewValid = {
  _id: 'string'
};

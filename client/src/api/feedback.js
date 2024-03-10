import { getData } from '@lib/axios';

export const getListCourseReviewApi = (params) => getData('/admin/courseReview/getListCourseReview', params);
export const getListCommentLessonApi = (params) => getData('/admin/comment/getListCommentLesson', params);

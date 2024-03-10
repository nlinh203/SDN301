import { getData } from '@lib/axios';

export const getListUserInfoApi = (params) => getData('/info/getListUserInfo', params);
export const getListCourseInfoApi = (params) => getData('/info/getListCourseInfo', params);
export const getListLessonInfoApi = (params) => getData('/info/getListLessonInfo', params);
export const getListPostInfoApi = (params) => getData('/info/getListPostInfo', params);

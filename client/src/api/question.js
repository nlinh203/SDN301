import { getData, postData } from '@lib/axios';

export const getListQuestionApi = (params) => getData('/admin/question/getListQuestion', params);
export const deleteQuestionApi = (params) => postData('/admin/question/deleteQuestion', params);
export const addQuestionApi = (params) => postData('/admin/question/addQuestion', params);
export const updateQuestionApi = (params) => postData('/admin/question/updateQuestion', params);
export const importQuestionApi = (params) => postData('/admin/question/importQuestion', params, false, true);
export const exportQuestionApi = (params) => getData('/admin/question/exportQuestion', params, true);

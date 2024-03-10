import { getData, postData } from '@lib/axios';

export const getListCommentApi = (params) => getData('/comment/getListComment', params);
export const deleteCommentApi = (params) => postData('/comment/deleteComment', params);
export const addCommentApi = (params) => postData('/comment/addComment', params, true);

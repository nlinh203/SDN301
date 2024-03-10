import { getData, postData } from '@lib/axios';

export const getListPostApi = (params) => getData('/admin/post/getListPost', params);
export const detailPostApi = (params) => getData('/admin/post/detailPost', params);
export const deletePostApi = (params) => postData('/admin/post/deletePost', params);
export const addPostApi = (params) => postData('/admin/post/addPost', params, true);
export const updatePostApi = (params) => postData('/admin/post/updatePost', params, true);

export const getListPostWebApi = (params) => getData('/post/getListPostWeb', params);
export const getListNewsApi = (params) => getData('/post/getListNews', params);
export const detailPostWebApi = (params) => getData('/post/detailPostWeb', params);
export const likePostApi = (params) => postData('/post/likePost', params);
export const savePostApi = (params) => postData('/post/savePost', params);

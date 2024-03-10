import { getData, postData } from '@lib/axios';

export const getListUserApi = (params) => getData('/admin/user/getListUser', params);
export const deleteUserApi = (params) => postData('/admin/user/deleteUser', params);
export const addUserApi = (params) => postData('/admin/user/addUser', params, true);
export const updateUserApi = (params) => postData('/admin/user/updateUser', params, true);

export const updateUserInfoApi = (params) => postData('/user/updateUserInfo', params, true);
export const changePasswordApi = (params) => postData('/user/changePassword', params);

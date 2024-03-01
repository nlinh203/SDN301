import { getData, postData } from '@lib/axios';


export const updateUserInfoApi = (params) => postData('/user/updateUserInfo', params, true);
export const changePasswordApi = (params) => postData('/user/changePassword', params);

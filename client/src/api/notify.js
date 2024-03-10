import { getData, postData } from '@lib/axios';

export const getListNotifyApi = (params) => getData('/notify/getListNotify', params);
export const readAllNotifyApi = (params) => postData('/notify/readAllNotify', params);
export const updateStatusNotifyApi = (params) => postData('/notify/updateStatusNotify', params);

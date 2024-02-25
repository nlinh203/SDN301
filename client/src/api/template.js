import { getData, postData } from '@lib/axios';

export const getListTemplateApi = (params) => getData('/admin/template/getListTemplate', params);
export const detailTemplateApi = (params) => getData('/admin/template/detailTemplate', params);
export const deleteTemplateApi = (params) => postData('/admin/template/deleteTemplate', params);
export const addTemplateApi = (params) => postData('/admin/template/addTemplate', params, true);
export const updateTemplateApi = (params) => postData('/admin/template/updateTemplate', params, true);

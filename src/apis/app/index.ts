import Http from '@/utils/request';
import { I_GetAppFilter_Params, I_GetApptList, I_EditApp_Params } from './types';

export const getAppList = (params: I_GetApptList) => {
  return Http({
    url: '/apps/list',
    data: params
  });    
}

export const getAppFilter = (params: I_GetAppFilter_Params) => {
  return Http({
    url: '/apps/filter',
    method: 'get',
    data: params
  });    
}

export const editApp = (params: I_EditApp_Params) => {
  return Http({
    url: '/apps/edit',
    method: 'post',
    data: params
  });    
}

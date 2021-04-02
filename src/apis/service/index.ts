import Http from '@/utils/request';
import { I_GetAreaListByProductId_Params } from './types';

// 获取当前产品下账号体系列表

export const getAreaListByProductId = (params: I_GetAreaListByProductId_Params) => {
  return Http({
      url: '/cp/areas',
      method: 'get',
      data: params
  });    
}

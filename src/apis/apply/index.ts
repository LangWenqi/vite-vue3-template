import Http from '@/utils/request';
import { I_PostApplyProdcut } from './types';
// 申请
export function postApplyProdcut (params: I_PostApplyProdcut) {
  return Http({
    url: '/apply/product/role',
    method: 'post',
    data: params
  });
}

import Http from '@/utils/request';
import { I_GetProductList, I_EditProduct_Params, I_GetProductDetail_params } from './types';

// 获取产品列表
export const getProductList = (params: I_GetProductList) => {
  return Http({
    url: '/product/list',
    data: params
  });
}
// 产品编辑
export const editProduct = (params: I_EditProduct_Params) => {
  return Http({
    url: '/product/update',
    data: params,
    method: 'post'
  });
}

// 产品添加
export const addProduct = (params: I_EditProduct_Params) => {
  return Http({
    url: '/product/add',
    data: params,
    method: 'post'
  });
}

// 产品详情
export const getProductDetail = (params: I_GetProductDetail_params) => {
  return Http({
    url: '/product/detail',
    method: 'get',
    data: params
  });
}

import { reactive } from 'vue';
import { I_GetProductList_Params } from '@/apis/product/types';
import { deepClone } from '@/utils/object';

// 产品列表删选组件

export const useListParams = () => {

  const staticProduuctParams: I_GetProductList_Params = {
    admin: [],
    organization: undefined,
    status: undefined,
    created_at: undefined,
    name: ''
  };

  const productParams = reactive<I_GetProductList_Params>(deepClone(staticProduuctParams));
  
  const resetProductParams = (filterArrs: string[] = []) => {
    Object.keys(staticProduuctParams).forEach((key: string) => {
      const paramsKey = key as keyof I_GetProductList_Params;
      if (!filterArrs.includes(key)) {
        (productParams as any)[paramsKey] = typeof staticProduuctParams[paramsKey] === 'object' ? deepClone(staticProduuctParams[paramsKey]) : staticProduuctParams[paramsKey];
      }
    })
  }

  return {
    productParams,
    resetProductParams
  }
}

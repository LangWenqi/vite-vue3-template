import { reactive, ref } from 'vue';
import { I_Channel_Item, I_Cp_Item } from '../../types/list/searchForm';
import { I_Area_Item } from '@/config/types/area';
import { I_GetAppList_params } from '@/apis/app/types';
import { deepClone } from '@/utils/object';
import { getAppFilter } from '@/apis/app';

// 产品列表删选组件

export const useListParams = () => {
  
  const areaList = ref<I_Area_Item[]>([]);

  const cpList = ref<I_Cp_Item[]>([]);

  const channelList = ref<I_Channel_Item[]>([])

  const handleAppFilter = (product_id: number) => {
    const params = {
      product_id
    }
    getAppFilter(params).then((data: any) => {
      areaList.value = data.areas || [];
      cpList.value = data.cp_contents || [];
      channelList.value = data.channels || [];
    })
  }

  const staticAppParams: I_GetAppList_params = {
    area_id: undefined,
    channel_market_type: undefined,
    cp_content_id: undefined,
    search: ''
  };

  const appParams = reactive<I_GetAppList_params>(deepClone(staticAppParams));
  
  const resetAppParams = (filterArrs: string[] = []) => {
    Object.keys(staticAppParams).forEach((key: string) => {
      const paramsKey = key as keyof I_GetAppList_params;
      if (!filterArrs.includes(key)) {
        (appParams as any)[paramsKey] = typeof staticAppParams[paramsKey] === 'object' ? deepClone(staticAppParams[paramsKey]) : staticAppParams[paramsKey];
      }
    })
  }

  return {
    appParams,
    areaList,
    cpList,
    channelList,
    resetAppParams,
    handleAppFilter
  }
}

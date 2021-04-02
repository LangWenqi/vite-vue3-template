import { inject, provide, toRefs, watch } from 'vue';
import { useListParams } from './searchForm';
import { useListData, useListTableColumns } from './listTable';

// 产品列表主页面

export const useAppList = (product_id: number) => {

  const listParams = useListParams();

  const listData = useListData(product_id);
  
  const { appParams, areaList, cpList, channelList, resetAppParams, handleAppFilter } = listParams;

  const { curpage, changePage, handleAppList } = listData;

  const searchAppList = () => {
    if (curpage.value !== 1) {
      changePage(1);
    } else {
      handleAppList(appParams);
    }
  }

  const resetAppList = () => {
    resetAppParams();
    searchAppList();
  }

  watch(curpage, () => {
    handleAppList(appParams);
  }, {
    immediate: true
  });

  return {
    appListData: {
      ...useListTableColumns(),
      ...listData
    },
    appParamsData: {
      ...toRefs(appParams),
      areaList,
      cpList,
      channelList,
      resetAppParams,
      handleAppFilter
    },
    appCommonData: {
      resetAppList,
      searchAppList
    }
  }
}

export const appListSymbol = Symbol('appList');

export const useInjectAppListData = () => {
  return inject(appListSymbol) as ReturnType<typeof useAppList>
}

export const useProvideAppListData = (product_id: number) => {
  const appListData = useAppList(product_id)
  provide(appListSymbol, appListData);
  return appListData;
}

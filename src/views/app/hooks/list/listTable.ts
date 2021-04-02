import { ref } from 'vue';
import { I_AppItem } from '../../types/list/listTable';
import { getAppList } from '@/apis/app';
import { I_GetAppList_params } from '@/apis/app/types';
import { I_Page } from '@/config/types/common';

export const useListTableColumns = () => {
  const columns = ([
    {
      title: '应用名',
      key: 'name',
      slots: { customRender: 'name' }
    },
    {
      title: '渠道平台',
      key: 'platforms',
      slots: { customRender: 'platforms' }
    },
    {
      key: 'areas',
      slots: { title: 'areasTitle', customRender: 'areas' }
    },
    {
      title: '渠道类型',
      key: 'channel_market_type_names',
      slots: { customRender: 'channel_market_type_names' }
    },
    {
      title: '包总数',
      dataIndex: 'package_count',
      key: 'package_count'
    },
    {
      title: '内容总数',
      dataIndex: 'cp_count',
      key: 'cp_count'
    },
    {
      title: '操作',
      key: 'control',
      slots: { customRender: 'control' }
    }
  ]);

  return {
    columns
  }
}

// 产品列表表格组件

export const useListData = (product_id: number) => {

  const loading = ref(false);
  
  const curpage = ref<number>(1);

  const rcount = ref<number>(0);

  const perpage = ref<number>(15);

  const appList = ref<I_AppItem[]>([]);
  
  const changePage = (page: number) => {
    curpage.value = page;
  }

  const handleAppList = (productParams: I_GetAppList_params) => {

    loading.value = true;
    
    getAppList({ ...productParams, curpage: curpage.value, perpage: perpage.value, product_id }).then((data: any) => {

      const { page, list }: { page: I_Page; list: I_AppItem[] } = data || {};

      appList.value = list || [];

      rcount.value = page.rcount;

      loading.value = false;
     
    }).catch(() => {

      loading.value = false;

    })
  }
  
  return {
    curpage,
    perpage,
    rcount,
    loading,
    appList,
    handleAppList,
    changePage
  }
}

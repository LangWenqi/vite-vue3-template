import { ref } from 'vue';
import { I_ProductItem } from '../../types/list/listTable';
import { getProductList } from '@/apis/product';
import { I_GetProductList_Params } from '@/apis/product/types';
import { I_Page } from '@/config/types/common';

export const useListTableColumns = () => {
  const columns = ([
    {
      title: '产品',
      key: 'name',
      slots: { customRender: 'name' }
    },
    {
      title: '状态',
      key: 'status',
      width: 80,
      slots: { customRender: 'status' }
    },
    {
      title: '所属组织',
      key: 'organization',
      slots: { customRender: 'organization' }
    },
    {
      title: '管理员',
      key: 'admin',
      slots: { customRender: 'admin' }
    },
    {
      title: '创建时间',
      key: 'created_at',
      width: 100,
      slots: { customRender: 'created_at' }
    },
    {
      title: '操作',
      key: 'control',
      width: 120,
      slots: { customRender: 'control' }
    }
  ]);

  return {
    columns
  }
}

// 产品列表表格组件

export const useListData = () => {

  const loading = ref(false);
  
  const curpage = ref<number>(1);

  const rcount = ref<number>(0);

  const perpage = ref<number>(15);

  const productList = ref<I_ProductItem[]>([]);
  
  const changePage = (page: number) => {
    curpage.value = page;
  }

  const handleProductList = (productParams: I_GetProductList_Params) => {

    loading.value = true;
    
    getProductList({ ...productParams, curpage: curpage.value, perpage: perpage.value }).then((data: any) => {

      const { page, list }: { page: I_Page; list: I_ProductItem[] } = data || {};

      productList.value = list || [];

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
    productList,
    handleProductList,
    changePage
  }
}

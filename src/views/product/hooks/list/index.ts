import { inject, provide, toRefs, watch } from 'vue';
import { useListParams } from './searchForm';
import { useListData, useListTableColumns } from './listTable';

// 产品列表主页面

export const useProductList = () => {

  const listParams = useListParams();

  const listData = useListData();
  
  const { productParams, resetProductParams } = listParams;

  const { curpage, changePage, handleProductList } = listData;

  const searchProductList = () => {
    if (curpage.value !== 1) {
      changePage(1);
    } else {
      handleProductList(productParams);
    }
  }

  const resetProductList = () => {
    resetProductParams();
    searchProductList();
  }

  watch(curpage, () => {
    handleProductList(productParams);
  }, {
    immediate: true
  });

  return {
    productListData: {
      ...useListTableColumns(),
      ...listData
    },
    productParamsData: {
      ...toRefs(productParams),
      resetProductParams
    },
    productCommonData: {
      resetProductList,
      searchProductList
    }
  }
}

export const productListSymbol = Symbol('productList');

export const useInjectProductListData = () => {
  return inject(productListSymbol) as ReturnType<typeof useProductList>
}

export const useProvideProductListData = () => {
  const productListData = useProductList()
  provide(productListSymbol, productListData);
  return productListData;
}

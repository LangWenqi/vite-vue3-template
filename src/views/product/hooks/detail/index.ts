import { inject, provide, ref } from 'vue';
import { useRoute } from 'vue-router';
import { getProductDetail } from '@/apis/product';
import { I_ProductDetail } from '../../types/detail/productDetail';

export const useProductDetail = () => {

  const loading = ref<boolean>(false);

  const productInfo = ref<I_ProductDetail | { [key: string]: any }>({
    created_at: '',
    creator: '',
    description: '',
    differ: 0,
    icon: '',
    id: 0,
    name: '',
    platform: [],
    privilege: 0,
    status: 0,
    product_admin: [],
    organization: undefined
  })

  const route = useRoute();

  const handleProductDetail = () => {

    loading.value = true;

    const params = {
      product_id: Number(route.query.id)
    }
    getProductDetail(params).then((data) => {
      productInfo.value = data as I_ProductDetail;
      loading.value = false;
    })
  }

  return {
    productInfo,
    loading,
    handleProductDetail
  }
}

export const productListSymbol = Symbol('productDetail');

export const useInjectProductDetailData = () => {
  return inject(productListSymbol) as ReturnType<typeof useProductDetail>
}

export const useProvideProductDetailData = () => {
  const productDetail = useProductDetail();
  provide(productListSymbol, productDetail);
  return productDetail;
}

import { computed, Ref } from 'vue';
import { useEditProductVisible } from '../modal/editProduct';
import { I_ProductDetail } from '../../types/detail/productDetail';
import { I_Organization, I_User } from '@/config/types/common';

export const useDetailEditProduct = (productInfo: Ref<I_ProductDetail>) => {
  const {
    editProductVisible,
    editProductData,
    handleEditProductVisible,
    handleEditProductData
  } = useEditProductVisible();
  
  const product_admin = computed<string[]>(() => (productInfo.value.product_admin.map((item: I_User) => (item.username))));
  
  const organizationList = computed<I_Organization[]>(() => (productInfo.value.organization ? [productInfo.value.organization] : []))
  
  const handleEditProductModal = (visible: boolean) => {
    const data = {
      product_id: productInfo.value.id,
      icon: productInfo.value.icon,
      name: productInfo.value.name,
      organization: productInfo.value.organization,
      product_admin: product_admin.value || [],
      adminList: productInfo.value.product_admin || [],
      organizationList: organizationList.value,
      description: productInfo.value.description || ''
    }
    handleEditProductData(data);
    handleEditProductVisible(visible);
  }
  return {
    editProductVisible,
    editProductData,
    handleEditProductModal
  }
}

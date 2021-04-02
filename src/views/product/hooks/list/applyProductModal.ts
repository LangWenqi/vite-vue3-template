import { useApplyProductVisible } from '../modal/applyProduct';
import { I_ProductItem } from '../../types/list/listTable';

export const useListApplyProduct = () => {
  const {
    applyProductVisible,
    applyProductData,
    handleApplyProductVisible,
    handleApplyProductData
  } = useApplyProductVisible();

  const handleApplyProductModal = (visible: boolean, record: I_ProductItem) => {
    handleApplyProductData({
      pro_id: record.id,
      role_id: undefined,
      product_name: record.name,
      apply_desc: ''
    });
    handleApplyProductVisible(visible);
  }
  return {
    applyProductVisible,
    applyProductData,
    handleApplyProductModal
  }
}

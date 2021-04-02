import { ref, reactive } from 'vue';
import { I_ApplyProductData } from '../../types/modal/applyProductModal';

export const useApplyProductVisible = () => {
  const applyProductVisible = ref<boolean>(false);

  const handleApplyProductVisible = (visible: boolean) => {
    applyProductVisible.value = visible;
  }

  const applyProductData = ref<I_ApplyProductData>({
    pro_id: 0,
    role_id: undefined,
    apply_desc: '',
    product_name: ''
  })

  const handleApplyProductData = (data: I_ApplyProductData) => {
    applyProductData.value = data;
  }

  return {
    applyProductVisible,
    applyProductData,
    handleApplyProductVisible,
    handleApplyProductData
  }
}

export const useApplyProductRules = () => {
  const rules = reactive({
    role_id: [
      { required: true, message: '请选择申请的角色' }
    ]
  })
  return {
    rules
  }
}

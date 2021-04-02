import { ref, reactive } from 'vue';
import { I_EditProductData } from '../../types//modal/editProductModal';

export const useEditProductVisible = () => {
  const editProductVisible = ref<boolean>(false);

  const handleEditProductVisible = (visible: boolean) => {
    editProductVisible.value = visible;
  }

  const editProductData = ref<I_EditProductData>({
    icon: '',
    name: '',
    organization: undefined,
    product_admin: [],
    product_id: undefined,
    adminList: [],
    organizationList: [],
    description: ''
  })

  const handleEditProductData = (data: I_EditProductData) => {
    editProductData.value = data;
  }

  return {
    editProductVisible,
    editProductData,
    handleEditProductVisible,
    handleEditProductData
  }
}

export const useEditProductRules = () => {
  const rules = reactive({
    icon: [
      { required: true, message: '请上传产品图标' }
    ],
    name: [
      { required: true, message: '请输入产品名称' }
    ],
    organization: [
      { required: true, message: '请选择所属组织' }
    ],
    product_admin: [
      { required: true, message: '请选择产品管理员' }
    ]
  })
  return {
    rules
  }
}

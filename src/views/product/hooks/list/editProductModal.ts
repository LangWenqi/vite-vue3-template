import { useEditProductVisible } from '../modal/editProduct';
import { I_User } from '@/config/types/common';
import { I_ProductItem } from '../../types/list/listTable';

export const useListEditProduct = () => {
  const {
    editProductVisible,
    editProductData,
    handleEditProductVisible,
    handleEditProductData
  } = useEditProductVisible();

  const getAdminArr = (record: I_ProductItem) => {
    return record.role_list && Array.isArray(record.role_list.product_admin) ? record.role_list.product_admin : [];
  }

  const getAdminIds = (record: I_ProductItem) => {
    const arr = getAdminArr(record);
    return arr.length > 0 ? arr.map((item: I_User) => item.username) : [];
  }

  const getOrganizations = (record: I_ProductItem) => {
    return record.organization && record.organization.id ? [record.organization] : [];
  }

  const handleEditProductModal = (visible: boolean, record?: I_ProductItem) => {
    const data = {
      product_id: record ? record.id : undefined,
      icon: record ? record.icon : '',
      name: record ? record.name : '',
      organization: record ? record.organization : undefined,
      product_admin: record ? getAdminIds(record) : [],
      adminList: record ? getAdminArr(record) : [],
      organizationList: record ? getOrganizations(record) : [],
      description: (record && record.description) || ''
    }
    handleEditProductData(data);
    handleEditProductVisible(visible);
  }

  return {
    editProductVisible,
    editProductData,
    getAdminArr,
    handleEditProductModal
  }
}

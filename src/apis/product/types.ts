import { I_Organization } from '@/config/types/common';
export interface I_GetProductList extends I_GetProductList_Params {
  curpage: number;
  perpage: number;
}

export interface I_GetProductList_Params {
  admin: string[];
  organization: string | undefined;
  status: number | undefined;
  created_at: string | undefined;
  name: string | undefined;
}

export interface I_EditProduct_Params {
  icon: string;
  name: string;
  organization: I_Organization;
  product_admin: string[];
  product_id?: number
}

export interface I_GetProductDetail_params {
  product_id: number
}
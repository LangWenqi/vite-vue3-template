import { I_Organization, I_User } from '@/config/types/common';
export interface I_ProductItem {
  created_at: string;
  creator: string;
  description: string;
  differ: number;
  icon: string;
  id: number;
  name: string;
  privilege: number;
  status: number;
  role_list: I_ProductItem_RoleList;
  organization: I_Organization;
  [key: string]: any;
}

export interface I_ProductItem_RoleList {
  product_admin: I_User[];
  [key: string]: any;
}


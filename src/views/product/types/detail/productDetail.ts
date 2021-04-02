import { I_Organization, I_User } from '@/config/types/common';

export interface I_ProductDetail {
  created_at: string;
  creator: string;
  description: string;
  differ: number;
  icon: string;
  id: number;
  name: string;
  platform: number[];
  privilege: number;
  status: number;
  product_admin: I_User[];
  organization: I_Organization;
  [key: string]: any;
}

import { actions } from './index';
export interface I_CommonInject extends I_CommonActions{
  commonState: I_CommonState;
}
export interface I_CommonState {
  collapsed: boolean;
  basicInfo: I_BasicInfo;
  channel: {
    [key: string]: string
  };
  charge_mode: {
    [key: string]: string
  };
  platform_channel: {
    [key: string]: {
      [key: string]: string
    }
  };
  product_type: {
    [key: string]: string
  };
  role_product: I_RoleItem[];
  role_total: I_RoleItem[];
  service_framework: {
    [key: string]: string
  }
}

type I_CommonActions = typeof actions

/************************************* I_BasicInfo *************************************/
export interface I_BasicInfo {
  user: I_BasicInfo_User
}

export interface I_BasicInfo_User {
  username: string;
  name: string;
  email: string;
  picture: string;
  company: I_BasicInfo_User_Company;
}

export interface I_BasicInfo_User_Company{
  business_name: string;
  company_id: string;
  company_name: string;
  department_code: string;
  department_id: string;
  department_name: string;
  group_company_id: string;
  group_e_number: string;
  job_name: string;
  manage_position: string;
  manage_ranks: string;
  professional_position: string;
  professional_ranks: string;
}

export interface I_RoleItem {
  description: string;
  id: number;
  key: string;
  name: string;
}
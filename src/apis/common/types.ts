export interface I_GetSearchUsers {
  name: string;
}

export interface I_SearchOrganization {
  name: string;
}
// product_total——后台所有产品列表；
// product_own——用户拥有的产品列表；
// product_access——审批通过的产品列表；
// service_framework——标签——服务框架；
// charge_mode——标签——收费模式；
// product_type——标签——产品类型；
// product_role——产品角色；
// channel——渠道
export interface I_GetMapProduct {
  type: I_GetMapProduct_Type[]
}

export type I_GetMapProduct_Type = 'product_total' | 'product_own' | 'product_access' | 'service_framework' | 'charge_mode' | 'product_type' | 'product_role' | 'channel' | 'platform_channel' | 'role_product' | 'role_total'
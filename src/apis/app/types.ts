export interface I_GetAppFilter_Params {
  product_id: number
}


export interface I_GetApptList extends I_GetAppList_params {
  curpage: number;
  perpage: number;
  product_id: number;
}

export interface I_GetAppList_params {
  area_id: number | undefined;
  channel_market_type: number | undefined;
  cp_content_id: number | undefined;
  search: string;
}

export interface I_EditApp_Params {
  app_id?: number;
  area_ids: number[];
  game_type: string;
  icon: string;
  name: string;
  product_id: number;
}

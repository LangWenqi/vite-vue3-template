
export interface I_Channel_Item {
  channel_market_platform: number;
  channel_market_type: number;
  channel_market_type_name: string;
  created_at: string;
  deleted_at: string;
  qualifications: string;
  status: number;
  updated_at: string;
}

export interface I_Cp_Item {
  created_at: string;
  desc: string;
  game_id: number;
  id: number;
  name: string;
  product_id: number;
  remark: string;
  status: number;
  updated_at: number;
}
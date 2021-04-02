import { I_Area_Item } from '@/config/types/area';

export interface I_AppItem {
  areas: I_Area_Item[];
  channel_market_type_names: string[];
  cp_count: number;
  created_at: string;
  creator: string;
  game_type: string;
  icon: string;
  id: number;
  is_old: number;
  name: string;
  package_count: number;
  platforms: number[];
  product_id: number;
  updated_at: string;
}

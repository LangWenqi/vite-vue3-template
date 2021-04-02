import { I_Area_Item } from '@/config/types/area';

export interface I_EditAppParams {
  app_id?: number;
  game_type: string;
  area_ids: number[];
  name: string;
  icon: string;
}

export interface I_EditAppData extends I_EditAppParams {
  areas: I_Area_Item[]
}

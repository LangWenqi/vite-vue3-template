import { ref } from 'vue';
import { getAreaListByProductId } from '@/apis/service';
import { I_Area_Item } from '../types/area';

export const useAreasByProductId = (product_id: number) => {

  const areaList = ref<I_Area_Item[]>([]);

  const handleAreaListByProductId = (product_id: number) => {
    const params = {
      product_id
    }
    getAreaListByProductId(params).then((data) => {
      areaList.value = (data as I_Area_Item[]) || [];
    })
  }

  handleAreaListByProductId(product_id);
  
  return {
    areaList,
    handleAreaListByProductId
  }
}
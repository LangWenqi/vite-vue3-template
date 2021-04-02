import { useEditAppVisible } from '../modal/editAppModal';
import { I_AppItem } from '../../types/list/listTable';

export const useListEditProduct = () => {
  const {
    editAppVisible,
    editAppData,
    handleEditAppVisible,
    handleEditAppData
  } = useEditAppVisible();


  const handleEditAppModal = (visible: boolean, record?: I_AppItem) => {
    const data = {
      app_id: record?.id,
      game_type: record?.game_type || '',
      area_ids: [],
      name: record?.name || '',
      icon: record?.icon || '',
      areas: record?.areas || []
    }
    handleEditAppData(data);
    handleEditAppVisible(visible);
  }

  return {
    editAppVisible,
    editAppData,
    handleEditAppModal
  }
}

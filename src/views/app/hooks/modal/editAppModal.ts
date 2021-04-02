import { ref, reactive } from 'vue';
import { accountMap } from '@/config/maps/common';
import { I_EditAppData } from '../../types/modal/editAppModal';

export const useEditAppVisible = () => {
  const editAppVisible = ref<boolean>(false);

  const handleEditAppVisible = (visible: boolean) => {
    editAppVisible.value = visible;
  }

  const editAppData = ref<I_EditAppData>({
    app_id: undefined,
    game_type: '',
    area_ids: [],
    name: '',
    icon: '',
    areas: []
  })

  const handleEditAppData = (data: I_EditAppData) => {
    editAppData.value = data;
  }

  return {
    editAppVisible,
    editAppData,
    handleEditAppVisible,
    handleEditAppData
  }
}

export const useEditAppRules = () => {
  const rules = reactive({
    game_type: [
      { required: true, message: '请选择平台类型' }
    ],
    name: [
      { required: true, message: '请输入应用名' }
    ],
    icon:  [
      { required: true, message: '请上传应用图标' }
    ]
  })
  return {
    rules
  }
}

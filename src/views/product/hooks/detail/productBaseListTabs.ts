import { ref } from 'vue';
import { appIdDes, cpContentDes } from '@/config/maps/common';

export const useProductBaseListTabs = () => {

  const tabsList = ref([
    {
      key: '1',
      title: '应用列表',
      des: appIdDes,
      icon: 'InfoCircleOutlined',
      componentName: 'appList'
    },
    {
      key: '2',
      title: 'cp内容列表',
      des: cpContentDes,
      icon: 'InfoCircleOutlined',
      componentName: 'cpList'
    }
  ]);

  const activeKey = ref<string>(tabsList.value[0].key);

  return {
    tabsList,
    activeKey
  }
}

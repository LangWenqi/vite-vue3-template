<template>
  <a-config-provider :locale="zh_CN">
    <router-view />
  </a-config-provider>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';

moment.locale('zh-cn');

export default defineComponent({
  name: 'App',
  components: {
  },
  setup () {
    const zh_CN = ref(zhCN);

    return {
      zh_CN
    }
  }
})
</script>  

<style lang="scss">
#app {
  width: 100%;
  height: 100vh;
}
</style>

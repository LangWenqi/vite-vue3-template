<template>
  <div class="padding-left-24 padding-right-24 padding-bottom-24">
    <a-tabs v-model:activeKey="activeKey">
      <a-tab-pane :key="tabsItem.key" v-for="tabsItem in tabsList">
        <template v-slot:tab>
          {{tabsItem.title}}
          <span>
            <a-tooltip :title="tabsItem.des">
              <component :is="tabsItem.icon"></component>
            </a-tooltip>
          </span>
        </template>
        <component :is="tabsItem.componentName"></component>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useProductBaseListTabs } from '../../hooks/detail/productBaseListTabs';
import appList from '@/views/app/index.vue';
import cpList from '@/views/cp/index.vue';
import { InfoCircleOutlined } from '@ant-design/icons-vue';

export default defineComponent({
  name: 'ProductBaseList',
  components: {
    InfoCircleOutlined,
    appList,
    cpList
  },
  setup () {

    const { tabsList, activeKey } = useProductBaseListTabs();

    return {
      tabsList,
      activeKey
    }
  }
})
</script>

<style lang="scss" scoped>

</style>


<template>
  <a-layout
    id="components-layout-demo-responsive"
    class="height-vh-100"
  >
    <v-sideBar />
    <a-layout class="height-vh-100">
      <v-header />
      <a-layout-content class="padding-all-16 overflow--auto">
        <div class="min-height-per-100 bg-white">
          <slot />
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import vSideBar from './sidebar.vue';
import vHeader from './header.vue';

export default defineComponent({
  name: 'Home',
  components: {
    vSideBar,
    vHeader
  },
  setup () {
    const selectedKeys = ref([]);

    const onCollapse = (collapsed: any, type: any) => {
      console.log(collapsed, type)
    }
    const onBreakpoint = (broken: any) => {
      console.log(broken);
    }
    return {
      onCollapse,
      onBreakpoint,
      selectedKeys
    }
  }
})
</script>

<style lang="scss" scoped>
 
</style>

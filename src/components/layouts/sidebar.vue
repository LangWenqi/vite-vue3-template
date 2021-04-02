
<template>
  <a-layout-sider
    class="height-vh-100 overflow--auto--hide-scrollbar"
    breakpoint="lg"
    :collapsed="collapsed"
  >
    <div class="sidebar__title padding-left-16 color-white font-22" :flex="`cross:center main:${collapsed ? 'center' : 'left'}`">
      <CodepenOutlined class="margin-right-12" />
      <span v-show="!collapsed" class="overflow--hidden--nowrap">vue</span>
    </div>
    <div class="sidebar__list overflow--auto--hide-scrollbar">
      <a-menu theme="dark" mode="inline" :selectedKeys="[currentPath]" @click="changeMenuRoute">
        <a-menu-item :key="menuItem.path" v-for="menuItem in menuList">
          <component :is="menuItem.icon"></component>
          <span class="nav-text">{{menuItem.name}}</span>
        </a-menu-item>
      </a-menu>
    </div>
  </a-layout-sider>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { CodepenOutlined, AppstoreOutlined } from '@ant-design/icons-vue';
import { useCollapsed, useMenuList, useSelectRoute } from '../hooks/layouts/sidebar';

export default defineComponent({
  name: 'SideBar',
  components: {
    CodepenOutlined,
    AppstoreOutlined  
  },
  setup () {
    const { collapsed } = useCollapsed();

    const { menuList } = useMenuList();

    const { currentPath, handleMenuRoute } = useSelectRoute();

    const changeMenuRoute = ({ key: path }: { key: string}) => {
      if (currentPath.value === path) return;
      handleMenuRoute(path);
    }
    return {
      collapsed,
      menuList,
      currentPath,
      handleMenuRoute,
      changeMenuRoute
    }
  }
})
</script>

<style lang="scss" scoped>
.sidebar__list {
  height: calc(100vh - 50px);
}
.sidebar__title {
  height: 50px;
}
</style>

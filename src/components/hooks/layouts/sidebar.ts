
import { watchEffect, computed, ref } from 'vue';
import { useInject } from '@/inject';
import { commonSymbol } from '@/inject/constants';
import { sidebarList } from '@/config/maps/menu';
import { I_SidebarItem } from '@/config/types/common';
import { useRouter, useRoute } from 'vue-router'

export const useCollapsed = () => {

  const { commonState, handleCollapsed } = useInject(commonSymbol);

  const collapsed = computed<boolean>(() => commonState.collapsed);

  const resizeCallBack = () => {
    handleCollapsed(window.innerWidth <= 1200);
  }

  watchEffect((onInvalidate) => {
    resizeCallBack();
    window.addEventListener('resize', resizeCallBack);
    onInvalidate(() => {
      window.removeEventListener('resize', resizeCallBack);
    })
  })

  return {
    collapsed
  }
}

export const useMenuList = () => {
  const menuList = ref<I_SidebarItem[]>(sidebarList);
  return {
    menuList
  }
}

export const useSelectRoute = () => {

  const route = useRoute();

  const router = useRouter();

  const currentPath = computed<string>(() => route.path);

  const handleMenuRoute = (path: string) => {
    router.push(path);
  }

  return {
    currentPath,
    handleMenuRoute
  }
}

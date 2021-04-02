
<template>
  <a-layout-header class="bg-white padding-left-16 padding-right-16">
    <div class="height-per-100" flex="main:justify cross:center">
      <span class="cursor font-18" @click="handleCollapsed(!collapsed)">
        <MenuUnfoldOutlined v-if="collapsed"/>
        <MenuFoldOutlined  v-else/>
      </span>
      <span>
        <span>
          <a-dropdown>
            <span class="cursor">
              <a-avatar :size="avatarSize" :src="avatarUrl">
                <template v-slot:icon><UserOutlined /></template>
              </a-avatar>
              <span class="font-14 margin-left-4 margin-right-4" @click="aaa">{{name}}</span>
              <DownOutlined />
            </span>
            <template v-slot:overlay>
              <a-menu>
                <a-menu-item>
                  <div @click="handleLogout" class="font-12 color-primary">退出</div>
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </span>
        <a-button className='margin-left-12' target='_blank' :href="HELP_URL" type="link">
          使用说明
          <QuestionCircleOutlined />
        </a-button>
      </span>
    </div>
  </a-layout-header>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue';
import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined, DownOutlined, QuestionCircleOutlined } from '@ant-design/icons-vue';
import { useInject } from '@/inject';
import { commonSymbol } from '@/inject/constants';
import { HELP_URL } from '@/config/maps/common';
import { handleLogout } from '@/apis/common';

export default defineComponent({
  name: 'Home',
  components: {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
    DownOutlined,
    QuestionCircleOutlined
  },
  setup () {

    const avatarSize = ref(40);

    const { commonState, handleCollapsed } = useInject(commonSymbol);
    const collapsed = computed(() => (commonState.collapsed));

    const avatarUrl = computed(() => (commonState.basicInfo.user.picture));

    const name = computed(() => (commonState.basicInfo.user.name));

    return {
      handleCollapsed,
      collapsed,
      avatarSize,
      avatarUrl,
      name,
      HELP_URL,
      handleLogout
    }
  }
})
</script>

<style lang="scss" scoped>
 
</style>

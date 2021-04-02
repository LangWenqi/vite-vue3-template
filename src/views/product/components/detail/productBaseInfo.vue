<template>
  <div class="padding-all-24">
    <a-skeleton :avatar="{
      size: avatarSize,
      shape: 'square'
    }" :loading="loading" :paragraph="{ rows: 2 }">
      <div flex>
        <a-avatar class="border-radius-4" flex-box="0" :size="avatarSize" shape="square" :src="productInfo.icon"></a-avatar>
        <div flex-box="1" class="margin-left-24">
          <div flex="cross:center">
            <span class="font-18 font-weight">{{productInfo.name}}</span>
            <a-tag :color="status.color" class="margin-left-12">
                {{status.name}}
            </a-tag>
            <div class="ant-btn_wrap_left" flex-box="1" flex="main:right">
              <a-tooltip placement="topRight" :title="areaIdDes">
                <a-button type="primary"><PlusOutlined/>申请账号体系<InfoCircleOutlined /></a-button>
              </a-tooltip>
              <a-tooltip placement="topRight" :title="groupIdDes">
                <a-button type="primary"><PlusOutlined/>申请部署服务组<InfoCircleOutlined /></a-button>
              </a-tooltip>
              <a-button type="primary" @click="editProdcut">编辑</a-button>
            </div> 
          </div>
          <div>
            {{productInfo.organization?.name}}
            <a-divider type="vertical"/>
            {{created_at}}
          </div>
          <div class="ant-btn-no-padding">
            product_id：
            {{productInfo.id}}
            <a-button type="link" @click="handleCopy(productInfo.id)">复制</a-button>
          </div>
          <div>
            成员：
            {{product_admin}}
          </div>
        </div>
      </div>
    </a-skeleton>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useInjectProductDetailData } from '../../hooks/detail';
import { mapProductStatus, areaIdDes, groupIdDes } from '@/config/maps/common';
import { copyExec } from '@/utils';
import { message } from 'ant-design-vue';
import { PlusOutlined, InfoCircleOutlined } from '@ant-design/icons-vue';
import { I_User } from '@/config/types/common';
// I_Organization
const avatarSize = 80;

export default defineComponent({
  name: 'ProductBaseInfo',
  components: {
    PlusOutlined,
    InfoCircleOutlined
  },
  setup (props, context) {
    const { productInfo, loading } = useInjectProductDetailData();

    const status = computed(() => ({
      color: mapProductStatus[productInfo.value.status]?.color || '',
      name: mapProductStatus[productInfo.value.status]?.name || ''
    }))

    const created_at = computed<string>(() => (productInfo.value.created_at?.split(' ')[0]));

    const product_admin = computed<string>(() => (productInfo.value.product_admin.map((item: I_User) => (item.nickname)).join('、')))

    const handleCopy = (product_id: number) => {
      if (copyExec(String(product_id))) {
        message.success({ content: '复制成功', key: 1 })
      }
    }

    const editProdcut = () => {
      context.emit('edit-product');
    }

    return {
      avatarSize,
      loading,
      productInfo,
      status,
      created_at,
      handleCopy,
      product_admin,
      areaIdDes,
      groupIdDes,
      editProdcut
    }
  }
})
</script>

<style lang="scss" scoped>
 
</style>

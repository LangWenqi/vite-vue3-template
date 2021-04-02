<template>
  <div class="padding-top-24">
    <a-table
      size="middle"
      rowKey="id"
      :columns="columns"
      :loading="loading"
      :data-source="appList"
      :pagination="{
        showQuickJumper: true,
        onChange: changePage,
        current: curpage,
        pageSize: perpage,
        total: rcount,
        size: 'normal'
      }"
    >
      <template v-slot:name="{ record }">
        <div flex="cross:center" :style="{minWidth: minWidth}">
          <a-avatar class="border-radius-4" :size="48" shape="square" :src="record.icon"></a-avatar>
          <div class="margin-left-12">
            <div>{{record.name}}</div>
          </div>
        </div>
      </template>
      <template v-slot:channel_market_type_names="{ record }">
        {{getChannelMarketTypeNames(record)}}
      </template>
      <template v-slot:platforms="{ record }">
        {{getPlatforms(record)}}
      </template>
      <template v-slot:control="{ record }">
        <div class="ant-btn-no-padding" :style="{minWidth: minWidth}">
          <a-button type="link">编辑</a-button> 
        </div>
      </template>
    </a-table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useInjectAppListData } from '../../hooks/list';
import { I_AppItem } from '../../types/list/listTable';
import { mapPlatform } from '@/config/maps/common';

const minWidth = '80px';

export default defineComponent({
  name: 'AppListTable',
  components: {

  },
  setup () {
    
    const { appListData } = useInjectAppListData();

    const { 
      curpage,
      perpage,
      rcount,
      loading,
      columns,
      appList,
      changePage
    } = appListData;

    const getChannelMarketTypeNames = (record: I_AppItem) => {
      return record.channel_market_type_names && record.channel_market_type_names.length > 0 ? record.channel_market_type_names.join('、') : '-';
    }

    const getPlatforms = (record: I_AppItem) => {
      return record.platforms && record.platforms.length > 0 ? record.platforms.map((key: number) => mapPlatform[key]).join('、') : '-';
    }
    
    return {
      minWidth,
      curpage,
      perpage,
      rcount,
      loading,
      columns,
      appList,
      changePage,
      getChannelMarketTypeNames,
      getPlatforms
    }
  }
})
</script>

<style lang="scss" scoped>
 
</style>

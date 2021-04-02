<template>
  <div>
    <a-row>
      <a-col :span="8">
        <a-form-item label="账号体系" :labelCol="inlineLabelCol" :wrapperCol="inlineWrapperCol">
          <a-select
            show-search
            class="width-per-100"
            v-model:value="area_id"
            placeholder="请选择账号体系"
            :filter-option="false"
            :default-active-first-option="false"
            allowClear
          >
            <a-select-option v-for="areaItem in areaList" :key="areaItem.area_id">
              {{areaItem.area_name}}{{`[${areaItem.area_id}]`}}
            </a-select-option>
          </a-select>
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item label="渠道类型" :labelCol="inlineLabelCol" :wrapperCol="inlineWrapperCol">
          <a-select
            show-search
            class="width-per-100"
            v-model:value="channel_market_type"
            placeholder="请选渠道类型"
            :filter-option="false"
            :default-active-first-option="false"
            allowClear
          >
            <a-select-option v-for="channelMarketItem in channelList" :key="channelMarketItem.channel_market_type">
              {{channelMarketItem.channel_market_type_name}}
            </a-select-option>
          </a-select>
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item label="内容" :labelCol="inlineLabelCol" :wrapperCol="inlineWrapperCol">
          <a-select
            show-search
            class="width-per-100"
            v-model:value="cp_content_id"
            placeholder="请选择账号体系"
            :filter-option="false"
            :default-active-first-option="false"
            allowClear
          >
            <a-select-option v-for="cpItem in cpList" :key="cpItem.id">
              {{cpItem.name}}{{`[${cpItem.id}]`}}
            </a-select-option>
          </a-select>
        </a-form-item>
      </a-col>
      <a-col :span="8" class="ant-form-margin-0">
        <a-form-item label="关键词" :labelCol="inlineLabelCol" :wrapperCol="inlineWrapperCol">
          <a-input v-model:value="search" allowClear placeholder="请输入关键词"></a-input>
        </a-form-item>
      </a-col>
      <a-col :span="8" :push="8">
        <div flex="main:right cross:center">
          <a-button type="primary"><PlusOutlined/>创建应用</a-button>
          <a-button type="primary" class="margin-left-12" @click="searchAppList">搜索</a-button>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useInjectAppListData } from '../../hooks/list/index';
import { inlineLabelCol, inlineWrapperCol, singleLabelCol, singleWrapperCol } from '@/config/maps/layout';
import { PlusOutlined } from '@ant-design/icons-vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'AppSearchForm',
  components: {
    PlusOutlined
  },
  setup () {

    const route = useRoute();

    const { appParamsData, appCommonData } = useInjectAppListData();

    const { searchAppList } = appCommonData;

    const {
      area_id,
      channel_market_type,
      cp_content_id,
      search,
      areaList,
      cpList,
      channelList,
      handleAppFilter
    } = appParamsData;

    handleAppFilter(Number(route.query.id));

    return {
      singleLabelCol,
      singleWrapperCol,
      inlineLabelCol,
      inlineWrapperCol,
      area_id,
      channel_market_type,
      cp_content_id,
      search,
      areaList,
      cpList,
      channelList,
      searchAppList
    }
  }
})
</script>

<style lang="scss" scoped>
 
</style>

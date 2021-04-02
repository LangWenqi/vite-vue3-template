<template>
  <div class="padding-all-24">
    <div v-if="!isSeniorSearch">
      <a-input class="input-width" v-model:value="name" placeholder="请输入产品名" allowClear/>
      <a-button class="margin-left-24" type="primary" @click="searchProductList">搜索</a-button>
      <a-button type="link" @click="handleSeniorSearch(true)">高级搜索<DownOutlined/></a-button>
    </div>
    <div v-else>
      <a-row>
        <a-col :span="24" class="ant-form-margin-0">
          <a-form-item label="管理员" :labelCol="singleLabelCol" :wrapperCol="singleWrapperCol">
            <a-select
              class="select-width"
              mode="multiple"
              show-search
              v-model:value="admin"
              placeholder="请选择管理员"
              :filter-option="false"
              :not-found-content="userLoading ? undefined : null"
              @search="handleSearchUsers"
              allowClear
            >
              <template v-if="userLoading" v-slot:notFoundContent>
                <a-spin size="small" />
              </template>
              <a-select-option v-for="searchUserItem in searchUserList" :key="searchUserItem.username">
                {{ searchUserItem.nickname }}
              </a-select-option>
            </a-select>
            <a-button type="link" @click="handleSelfAdmin">只看自己的</a-button>
          </a-form-item>
        </a-col>
      </a-row>
      <a-divider dashed />
      <a-row>
        <a-col :span="8">
          <a-form-item label="所属组织" :labelCol="inlineLabelCol" :wrapperCol="inlineWrapperCol">
            <a-select
              show-search
              class="width-per-100"
              v-model:value="organization"
              placeholder="请选择所属组织"
              :filter-option="false"
              :default-active-first-option="false"
              :not-found-content="organizationLoading ? undefined : null"
              @search="handleSearchOrganization"
              allowClear
            >
              <template v-if="organizationLoading" v-slot:notFoundContent>
                <a-spin size="small" />
              </template>
              <a-select-option v-for="organizationItem in searcOrganizationList" :key="organizationItem.id">
                {{ organizationItem.name }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="产品状态" :labelCol="inlineLabelCol" :wrapperCol="inlineWrapperCol">
            <a-select
              show-search
              class="width-per-100"
              v-model:value="status"
              placeholder="请选择产品状态"
              :filter-option="false"
              allowClear
            >
              <a-select-option v-for="mapProductValue in mapProductStatus" :key="mapProductValue.status">
                {{ mapProductValue.name }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="创建时间" :labelCol="inlineLabelCol" :wrapperCol="inlineWrapperCol">
            <a-date-picker
              class="width-per-100"
              format="yyyy-MM-DD"
              :disabled-date="disabledNextDate"
            />
          </a-form-item>
        </a-col>
        <a-col :span="8" class="ant-form-margin-0">
          <a-form-item label="关键词" :labelCol="inlineLabelCol" :wrapperCol="inlineWrapperCol">
            <a-input v-model:value="name" allowClear placeholder="请输入关键词"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="8" :push="8">
          <div flex="main:right cross:center">
            <a-button type="primary" @click="searchProductList">搜索</a-button>
            <a-button class="margin-left-12" @click="resetProductList">重置</a-button>
            <a-button type="link" @click="handleSeniorSearch(false)">收起<UpOutlined/></a-button>
          </div>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { useInjectProductListData } from '../../hooks/list/index';
import { DownOutlined, UpOutlined } from '@ant-design/icons-vue';
import { useSearchUsers, useSearchOrganization } from '@/config/hooks/common';
import { useInject } from '@/inject';
import { commonSymbol } from '@/inject/constants';
import { mapProductStatus } from '@/config/maps/common';
import { disabledNextDate } from '@/utils/time';
import { inlineLabelCol, inlineWrapperCol, singleLabelCol, singleWrapperCol } from '@/config/maps/layout';

export default defineComponent({
  name: 'ProductSearchForm',
  components: {
    DownOutlined,
    UpOutlined
  },
  setup () {

    const { productParamsData, productCommonData } = useInjectProductListData();

    const { searchProductList, resetProductList } = productCommonData;

    const {
      admin,
      organization,
      status,
      created_at,
      name,
      resetProductParams
    } = productParamsData;

    const { handleSearchUsers, userLoading, searchUserList, handleSearchUserDataList } = useSearchUsers();
    const { searcOrganizationList, organizationLoading, handleSearchOrganization } = useSearchOrganization();

    const { commonState } = useInject(commonSymbol);

    const username = computed<string>(() => commonState.basicInfo.user.username);
    const nickname = computed<string>(() => commonState.basicInfo.user.name);

    const isSeniorSearch = ref<boolean>(false);

    const handleSeniorSearch = (seniorSearch: boolean) => {
      if (!seniorSearch) {
        resetProductParams(['name'])
      }
      isSeniorSearch.value = seniorSearch;
    }

    const setSelfAdmin = () => {
      admin.value = [username.value];
    }

    const handleSelfAdmin = () => {
      handleSearchUserDataList([
        {
          username: username.value,
          nickname: nickname.value
        }
      ]);
      setSelfAdmin();
    }
  
    return {
      singleLabelCol,
      singleWrapperCol,
      inlineLabelCol,
      inlineWrapperCol,
      mapProductStatus,
      admin,
      organization,
      status,
      created_at,
      name,
      searchProductList,
      isSeniorSearch,
      handleSearchUsers,
      userLoading,
      searchUserList,
      handleSelfAdmin,
      searcOrganizationList,
      organizationLoading,
      handleSearchOrganization,
      disabledNextDate,
      resetProductList,
      handleSeniorSearch
    }
  }
})
</script>

<style lang="scss" scoped>
 
</style>

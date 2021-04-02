<template>
  <div>
    <search-form />
    <div class="line-grey-16" />
    <div 
      class="padding-top-24 padding-left-24 padding-right-24"
      flex="main:justify cross:center"
    >
      <span class="font-18 font-weight">产品列表</span>
      <a-button
        type="primary"
        @click="toProductAdd"
      >
        <PlusOutlined />
        申请创建产品
      </a-button>    
    </div>
    <list-table ref="listTable" />
  </div>
</template>

<script lang="ts">
import { defineComponent, DefineComponent, ref } from 'vue';
import searchForm from './components/list/searchForm.vue';
import listTable from './components/list/listTable.vue';
import { useProvideProductListData } from './hooks/list';
import { PlusOutlined } from '@ant-design/icons-vue';

export default defineComponent({
  name: 'Product',
  components: {
    searchForm,
    listTable,
    PlusOutlined
  },
  setup () {
    useProvideProductListData();

    const listTable = ref<DefineComponent | null>(null);

    const toProductAdd = () => {
      const table = listTable.value as DefineComponent;
      if (table && table.handleEditProductModal) {
        table.handleEditProductModal(true);
      }
    }

    return {
      listTable,
      toProductAdd
    }
  }
})
</script>

<style lang="scss" scoped>
 
</style>

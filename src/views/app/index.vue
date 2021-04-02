<template>
  <div class="padding-left-24 padding-right-24 padding-bottom-24">
    <search-form></search-form>
    <list-table></list-table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useProvideAppListData } from './hooks/list';
import searchForm from './components/list/searchForm.vue';
import listTable from './components/list/listTable.vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'AppList',
  components: {
    searchForm,
    listTable
  },
  setup () {
    const route = useRoute();

    useProvideAppListData(Number(route.query.id));
  }
})
</script>

<style lang="scss" scoped>

</style>

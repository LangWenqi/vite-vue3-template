
<template>
  <div>
    <a-result
      status="403"
      title=""
      sub-title="请使用chrome（谷歌）浏览器访问"
    >
      <template #extra />
    </a-result>
  </div>
</template>    
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Chrome',
  components: {
  }
})
</script>

<style lang="scss" scoped>
 
</style>

<template>
  <div class="home__page">
    <v-layout>
      <router-view />
    </v-layout>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import vLayout from '@/components/layouts/layout.vue';

export default defineComponent({
  name: 'Home',
  components: {
    vLayout
  },
  setup () {
  }
})
</script>

<style lang="scss" scoped>
  .home__page {
    height: 100%;
  }
</style>

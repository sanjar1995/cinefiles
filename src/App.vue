<template>
  <div class="wrapper">
    <Header/>
    <RouterView v-slot="{Component}">
      <component :is="Component" :key="$route.fullPath"></component>
    </RouterView>
  </div>
</template>

<script setup>
import Header from '@/components/Header.vue'
import { RouterView } from 'vue-router'
</script>

<style lang="scss" scoped>

</style>
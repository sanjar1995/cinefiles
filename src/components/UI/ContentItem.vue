<template>
  <router-link :to="`/watch/${type}/${item.id}`" class="content-item">
    <img :src="imgPath + item.poster_path" alt="" class="content-item__img" />
    <h2 class="content-item__title">{{ item.title || item.name }}</h2>
  </router-link>
  
</template>

<script setup>
const imgPath = import.meta.env.VITE_IMG_PATH
import {ref} from 'vue'
const props = defineProps({
  item: Object,
});
const type = ref(props.item.title ? 'movie': 'tv')
</script>

<style lang="scss" scoped></style>

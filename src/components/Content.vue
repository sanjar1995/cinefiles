<template>
  <div class="container">
    <h2>{{ type == "movie" ? "Все фильмы" : "Все cериалы" }}</h2>
    <div class="content">
      <ContentItem
        v-for="(item, index) in movieOrTv"
        :key="index"
        :item="item"
        :type="type"
      />
    </div>
    <paginate
      :page-count="500"
      :click-handler="nextSlide"
      :prev-text="'пред'"
      :next-text="'след'"
      :container-class="'paginate-container'"
    >
    </paginate>
  </div>
</template>

<script setup>
import { usePopular } from "@/stores/popular";
import { ref, computed } from "vue";
import ContentItem from "@/components/UI/ContentItem.vue";
import Paginate from "vuejs-paginate-next";
const popularStore = usePopular();
const movieOrTv = computed(() => popularStore[props.type]);
const props = defineProps({
  type: String,
});
popularStore.getPopular(props, 1);
const nextSlide = (page) => {
  popularStore.getPopular(props, page);
  window.scrollTo({
    top:0,
    behavior:'smooth'
  })
};
</script>

<style lang="scss" scoped></style>

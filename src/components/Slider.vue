<template>
  <div class="slider">
    <h2 class="slider__title">{{ type == "movie" ? "Фильмы" : "Сереалы" }}</h2>
    <swiper
      :breakpoints="option"
      slidesPerView="5"
      :spaceBetween="25"
      :navigation="true"
      :modules="modules"
      class="slider__swiper"
    >
    
      <swiper-slide
        :class="{ active: activeSlide == index }"
        @click="getFilmById(item.id), (activeSlide = index)"
        class="slider__item"
        v-for="(item, index) in movieOrTv"
        :key="index"
      >
        <img v-lazy="imgPath + item.poster_path" alt="" class="slider__img" />
      </swiper-slide>
    </swiper>
    <InfoBlock
      :class="{ active: openInfoBlock }"
      v-if="film"
      @closeInfoBlock="(openInfoBlock = false), (activeSlide = null)"
      :film="film"
      :type="props.type"
    />
  </div>
</template>
<script setup>
import InfoBlock from "@/components/InfoBlock.vue";
import { usePopular } from "@/stores/popular.js";
import { useFilmById } from "@/stores/infoBlock.js";
import { Swiper, SwiperSlide } from "swiper/vue";
import { computed, ref } from "vue";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
const activeSlide = ref(null);
const imgPath = import.meta.env.VITE_IMG_PATH;
const popularStore = usePopular();
const filmByIdStore = useFilmById();
const props = defineProps({
  type: String,
});
popularStore.getPopular(props);
const modules = [Navigation];
const option = {
  320: {
    slidesPerView: 1,
  },
  576: {
    slidesPerView: 2,
  },
  900: {
    slidesPerView: 3,
  },
  1200: {
    slidesPerView: 4,
  },
  1600: {
    slidesPerView: 5,
  },
};
const movieOrTv = computed(() => popularStore[props.type]);
const film = ref(null);
async function getFilmById(id) {
  await filmByIdStore.getFilmById(props, id);
  openInfoBlock.value = true;
  film.value = computed(() => filmByIdStore[props.type]);
}
const openInfoBlock = ref(false);
</script>

<style lang="scss" scoped></style>

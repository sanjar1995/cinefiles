<template>
  <div class="current" v-if="watch">
    <div class="current__movie">
      <div class="current__movie-info">
        <h2 class="current__movie-title">{{ watch.title || watch.name }}</h2>
        <p class="current__movie-text">
          {{ watch.overview }}
        </p>
        <ul class="current__movie-list">
          <li>{{ year }}</li>
          <li v-for="(item, index) in watch.genres" :key="index">
            {{ item.name }} ,
          </li>
          <li>{{ runtime }}</li>
        </ul>
        <BtnMore />
      </div>
      <div class="current__movie-poster">
        <img :src="imgPath + watch.poster_path" alt="" />
      </div>
      <img
        :src="imgPath + watch.backdrop_path"
        alt=""
        class="current__movie-img"
      />
      <div class="current__movie-casts">
        <h3 class="casts-title">В главный ролях:</h3>
        <ul class="casts-list">
          <li v-for="(cast, index) in casts" :key="index">
            <Casts :item="cast" />
          </li>
        </ul>
      </div>
    </div>
    <ul class="current__info">
      <li>
        <h3 class="current__info-title">Бюджет</h3>
        <span class="current__info-descr">${{ watch.budget }}</span>
      </li>
      <li>
        <h3 class="current__info-title">Сборы</h3>
        <span class="current__info-descr">${{ watch.revenue }}</span>
      </li>
      <li>
        <h3 class="current__info-title">Статус</h3>
        <span class="current__info-descr">{{ watch.status }}</span>
      </li>
      <li>
        <h3 class="current__info-title">Исходное название</h3>
        <span class="current__info-descr">{{
          watch.original_title || watch.original_name
        }}</span>
      </li>
    </ul>
    <div class="recommended container">
      <h2 class="recommended__title">Рекомендации</h2>
      <div class="recommended__content ">
        <ContentItem v-for="(item, index) in recommended" :key="index" :item="item" :type="type"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import ContentItem from '@/components/UI/ContentItem.vue'
import { useFilmById } from "@/stores/infoBlock";
import { useCast } from "@/stores/cast";
import { useRecommended } from "@/stores/recommended";
import { useRoute } from "vue-router";
import { ref, computed } from "vue";
const imgPath = import.meta.env.VITE_IMG_PATH;
const imgPathFull = import.meta.env.VITE_IMG_FULLPATH;
const route = useRoute();
const id = route.params.id;
const filmStore = useFilmById();
const castStore = useCast();
const recommendedStore = useRecommended();
const type = route.params.type;
filmStore.getFilmById({ type }, id);
castStore.getCast(type, id);
recommendedStore.getRecommended(type, id);
const watch = computed(() => filmStore[type]);
const year = computed(
  () =>
    new Date(watch.value.release_date).getFullYear() ||
    new Date(watch.value.first_air_date).getFullYear()
);
const runtime = computed(() => {
  let h = Math.floor(
    type == "movie"
      ? watch.value.runtime / 60
      : watch.value.episode_run_time / 60
  );
  let m =
    type == "movie"
      ? watch.value.runtime - h * 60
      : watch.value.episode_run_time;
  return type == "movie" ? `${h} Час : ${m} Минут` : `${m} Минут`;
});
const casts = computed((el) =>
  castStore[type]?.cast.filter((elem, i) => i < 4)
);
const recommended = computed(() => {
  return recommendedStore[type]?.filter((el,index)=> index<4);
});
</script>

<style lang="scss" scoped></style>

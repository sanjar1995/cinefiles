<template>
    <div class="infoBlock" v-if="props.film">
        
        <button class="infoBlock__close" @click="$emit('closeInfoBlock', false)">
            <img src="@/assets/images/Close.svg" alt="">
        </button>
        <div class="infoBlock__descr">
            <h3 class="infoBlock__title">{{ film.title || film.name }}</h3>
            <p class="infoBlock__text">{{ film.overview || `Izox topilmadi` }}</p>
            <ul class="infoBlock__list">
                <li>{{year}}</li>
                <li v-for="(genre, index) in film.genres" :key="index">{{ genre.name }}</li>
                <li>{{runtime}}</li>
            </ul>
            <div class="casts">
                <Casts v-for="(item, index) in cast" :key="index" :item="item"/>
            </div>
            <router-link :to="`/watch/${type}/${film.id}`">
                <BtnMore />
            </router-link>
        </div>
        <img :src="imgFullPath + film.backdrop_path" alt="" class="infoBlock__img">
    </div>
</template>

<script setup>
import {computed, watch} from 'vue'
import {useCast} from '@/stores/cast.js'
const castStore = useCast()
const props = defineProps({
    film: Object,
    type:String
})
castStore.getCast(props.type, props.film.value.id)
watch(props.film, (film) => {
  castStore.getCast(props.type, props.film.value.id)
})
const film = computed(()=> props.film.value)
const imgFullPath = import.meta.env.VITE_IMG_FULLPATH
const cast = computed((el) => {
   return castStore[props.type]?.cast.filter((elem,i)=> i < 4)
})
const year = computed(()=> new Date(film.value.release_date).getFullYear() || new Date(film.value.first_air_date).getFullYear())
const runtime = computed(()=> {
    let h = Math.floor(props.type == 'movie' ? film.value.runtime / 60 :  film.value.episode_run_time / 60)
    let m = props.type == 'movie' ? film.value.runtime - (h * 60) : film.value.episode_run_time
    return props.type == 'movie' ?  `${h} Час : ${m} Минут` : `${m} Минут`
})
</script>

<style lang="scss" scoped></style>
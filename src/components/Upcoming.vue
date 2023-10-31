<template>
    <div class="upcoming" v-if="upcoming">
        <swiper :loop="true" :navigation="navigation" :centeredSlides="true" :autoplay="{
            delay: 10000,
            disableOnInteraction: false,
        }" :modules="modules" @autoplayTimeLeft="onAutoplayTimeLeft" class="mySwiper">
            <swiper-slide class="upcoming__slide" v-for="(movie, index) in upcoming" :key="index">
            <img :src="imgFullPath + movie.backdrop_path" alt="" class="upcoming__img">
            <div class="upcoming__content">
                <h1 class="upcoming__title">{{ movie.title }}</h1>
                <p class="upcoming__text">{{movie.overview || 'Izox topilmadi!'}}</p>
                <BtnMore/>
            </div>
            </swiper-slide>
            <template #container-end>
                <div class="next" @click="slide">
                    <div class="next__content">
                        <p class="next__subtitle">Следующий</p>
                        <h3 class="next__title">{{nextFilm.title}}</h3>
                    </div>
                    <img :src="imgPath + nextFilm.backdrop_path" alt="" class="next__img">
                    <div class="line" ref="line"></div>
                </div>
            </template>
        </swiper>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useUpcoming } from '@/stores/upcoming.js'
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import { Autoplay, Navigation } from 'swiper/modules';
const imgFullPath = import.meta.env.VITE_IMG_FULLPATH
const imgPath = import.meta.env.VITE_IMG_PATH
const upcomingStore = useUpcoming()
upcomingStore.getUpcoming()
const progressContent = ref(null);
const line = ref(null)
const onAutoplayTimeLeft = (s, time, progress) => {
    line.value.style.width = `${(1 - progress) * 100}%`
    if(time < 20){
        slide()
    }
};
const navigation = {nextEl: '.next'}
const modules = [Autoplay, Navigation]
const upcoming = computed(()=>upcomingStore.upcoming)
const nextSlide = ref(1)
function slide(){
    if(nextSlide.value == 19){
        nextSlide.value = 0
    }else{
        nextSlide.value++
    }
}
const nextFilm = computed(()=>{
    return upcoming.value[nextSlide.value]
})

</script>

<style lang="scss" scoped>
.swiper {
    width: 100%;
    height: 100%;
}

.swiper-slide {
    text-align: center;
    font-size: 18px;
    background: #fff;

    /* Center slide text vertically */
    display: flex;
    justify-content: center;
    align-items: center;
}

.swiper-slide img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
}
</style>
<template>
    
        <div class="casts__item">
            <img :src="imgPath + item.profile_path" alt="" class="casts__img">
            <span class="casts__name">{{ item.name }}</span>
    </div>
</template>

<script setup>
const props = defineProps({
    item: Object
})
const imgPath = import.meta.env.VITE_IMG_PATH
</script>

<style lang="scss">
.casts {
    display: flex;
    max-width: 450px;
    width: 100%;
    flex-wrap: wrap;
    gap: 15px;
    margin-bottom: 30px;

    &__item {
        border-radius: 25px;
        border: 1px solid #FFF;
        background: rgba(20, 20, 20, 0.50);
        padding-right: 15px;
        display: flex;
        align-items: center;
        column-gap: 10px;

    }

    &__name {
        font-size: 16px;
        color: #fff;
    }

    &__img {
        width: 45px;
        height: 50px;
        border-radius: 50%;
        object-fit: cover;
    }
}</style>
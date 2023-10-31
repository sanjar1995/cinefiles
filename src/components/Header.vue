<template>
    <header class="header">
        <nav class="nav">
            <div class="container">
                <div class="nav__content">
                    <a href="" class="logo">
                        <img src="@/assets/images/logo.svg" alt="">
                    </a>
                    <ul class="nav__list" :class="{ 'active': menuIsActive }">
                        <li v-for="(link, index) in links" :key="index">
                            <router-link :to="link.url" class="nav__link">{{ link.name }}</router-link>

                        </li>
                        <li>
                            <router-link class="nav__link" to="/search">
                                <img src="@/assets/images/search.svg" alt="">
                            </router-link>
                        </li>
                        <li class="menu-close" @click="menuIsActive = false">
                            <img src="@/assets/images/Close.svg" alt="">
                        </li>
                    </ul>
                    <button class="menu" @click="menuIsActive = true">
                        <img src="@/assets/images/list.svg" alt="">
                    </button>
                </div>
            </div>
        </nav>
     
    </header>
</template>

<script setup>

import { ref } from 'vue'
const menuIsActive = ref(false)
const links = [
    {
        name: 'Главная',
        url: '/'
    },
    {
        name: 'Фильмы',
        url: '/movie'
    },
    {
        name: 'Сериалы',
        url: '/tv'
    },
]

</script>

<style lang="scss" scoped></style>
<template>
    <div class="main container">
        <h2>Search</h2> 
        <form action="" class="search__form">
            <input type="text" class="search__input" placeholder="Найти фильм, сериал..." v-model="search">
        </form>
        <div class="search__content">
            <ContentItem 
            v-for="(item, index) in searchStore.getMovie" 
            :key="index"
            :item="item"
            />
          
        </div> 
    </div>
</template>

<script setup>
import ContentItem from '@/components/UI/ContentItem.vue'
import {ref, computed,reactive, watch} from 'vue'
import debounce from 'lodash.debounce'
import {useSearch} from '@/stores/search'
const search = ref(null)
const searchStore = useSearch()
// const search = computed({
//     get(){
//         return searchStore.word
//     },
//     set(value){
//         searchStore.word = value
//         searchStore.getSearch()
//     }
// })
watch(search, debounce(() => {
    searchStore.getSearch(search.value)
    console.log(search);
}, 500))
</script>

<style lang="scss" scoped>

</style>
<template>
    <div class="main">
        <Upcoming />
        <Slider type="movie"/>
        <Slider type="tv"/>
        <Top/>
    </div>
</template>

<script setup>
    import Slider from '@/components/Slider.vue'
    import Top from '@/components/Top.vue'
    import Upcoming from '@/components/Upcoming.vue'
</script>

<style lang="scss" scoped>

</style>
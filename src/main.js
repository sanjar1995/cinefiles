
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import noImg from '@/assets/images/no-img.jpg'
import loadImg from '@/assets/images/load-loading.gif'
import Casts from '@/components/UI/Casts.vue'
import BtnMore from '@/components/UI/BtnMore.vue'
import App from './App.vue'
import router from './router'
import "swiper/css";
import './assets/style/main.scss'
import lazyPlugin from 'vue3-lazy'
const app = createApp(App)
const lazyLoad = {
    loading: loadImg,
    error: noImg
}
app.component('Casts', Casts)
app.component('BtnMore', BtnMore)
app.use(createPinia())
app.use(router)
app.use(lazyPlugin,lazyLoad)
app.mount('#app')

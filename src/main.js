import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store' // O '@/store' si está en src/store

createApp(App).use(store).use(router).mount('#app')
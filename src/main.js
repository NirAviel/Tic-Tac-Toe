import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Modal from '@/components/Modal.vue'

const app = createApp(App)
app.component('Modal', Modal)

app.use(router)

app.mount('#app')

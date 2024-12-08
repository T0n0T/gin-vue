import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './main.css'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faBluetooth } from '@fortawesome/free-brands-svg-icons'
import { faWifi, faSignal, faPlug } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import { createPinia } from 'pinia'
import 'virtual:svg-icons-register'

library.add(faBluetooth, faWifi, faSignal, faPlug)
createApp(App)
    .component('font-awesome-icon', FontAwesomeIcon)
    .use(ElementPlus)
    .use(router)
    .use(createPinia())
    .mount('#app')

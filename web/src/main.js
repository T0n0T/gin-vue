import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import './assets/main.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
    faWifi,
    faSignal, // 用于LoRa
    faNetworkWired,
    faGear,
    faChartLine
} from '@fortawesome/free-solid-svg-icons'

/* 添加图标到库中 */
library.add(faWifi, faSignal, faNetworkWired, faGear, faChartLine)

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.component('font-awesome-icon', FontAwesomeIcon)
    .use(ElementPlus)
    .use(router)
    .mount('#app')
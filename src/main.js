import {createApp} from 'vue'
import {createPinia} from 'pinia'
import ElementPlus from 'element-plus'

import App from './App.vue'
import router from './router'
import EntryMain from './entry'

const app = createApp(App)

app.use(router)
app.use(EntryMain)
app.use(ElementPlus)
app.use(createPinia())

app.mount('#app')

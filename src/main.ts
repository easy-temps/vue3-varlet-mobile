import { createApp } from 'vue'
import { createHead } from '@unhead/vue'
import App from '@/App.vue'
import router from '@/router'
import pinia from '@/stores'
import { i18n } from '@/utils/i18n'

import '@/styles/app.less'
import 'virtual:uno.css'
import 'virtual-icons'

// Varlet Desktop adaptation
import '@varlet/touch-emulator'

const app = createApp(App)
const head = createHead()

app.use(head)
app.use(router)
app.use(pinia)
app.use(i18n)

app.mount('#app')

import { createApp } from 'vue'

// Vuetify
import { vuetify } from './plugins/vuetify'

// Custom CSS
import "./styles/global.scss"

// Import Root Component
import App from './App.vue'

// Import Pinia
import { createPinia } from 'pinia'

// Import Router
import router from './router/index'

// import multi language
import i18n from './plugins/i18n'

// import ApexChart
import VueApexCharts from 'vue3-apexcharts'

// import datepicker
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

const app = createApp(App)

// use DatePicker
app.component('Datepicker', Datepicker)
app.use(vuetify)
app.use(i18n)
app.use(VueApexCharts)
app.use(createPinia())
app.use(router)
app.mount('#app')
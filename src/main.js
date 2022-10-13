import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

import './assets/main.css'

createApp(App).use(createPinia()).mount('#app')

// start: npm run dev
// start json server: json-server -w ./data/db.json
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vue3GoogleLogin from 'vue3-google-login'

const app = createApp(App)
app.use(router)
app.use(vue3GoogleLogin, {
    clientId: '783560119197-shf1gffcnngo76um38m74fsma7pb1cf1.apps.googleusercontent.com'
  })
app.mount('#app')

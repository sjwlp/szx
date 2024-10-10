import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { zhCn } from 'element-plus/es/locales.mjs'
import 'virtual:svg-icons-register'
const app = createApp(App)
import globalComponent from './components/index'
import './styles/index.scss'
import router from '../src/router/index'
import pinia from './store'
import axios from 'axios'
app.use(ElementPlus, {
  locale: zhCn,
})
axios({
  url:'/api/user/login',
  method:'post',
  data:{
    username:'admin',
    password:'1111211'
  }
})
app.use(router)
app.use(globalComponent)
app.use(pinia)
app.mount('#app')

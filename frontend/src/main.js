import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import CONSTANTS from './services/parameters'
import { EventBus } from './services/event-bus'

import axios from 'axios'
import VueAxios from 'vue-axios'
import VueAuthenticate from 'vue-authenticate'

// import apolloProvider from './services/apollo'

// # region Style imports
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import '@/assets/scss/app.scss'
// # endregion

Vue.use(BootstrapVue)
Vue.use(ElementUI, { locale })

Vue.config.productionTip = false

window.EventBus = EventBus

const apiAxios = axios.create({
  baseURL: CONSTANTS.baseUrl
})

Vue.use(VueAxios, apiAxios)
Vue.use(VueAuthenticate, {
  baseUrl: CONSTANTS.baseUrl,
  loginUrl: 'auth/login/',
  registerUrl: 'auth/register/',
  tokenType: 'JWT'
})

router.beforeEach((to, from, next) => {
  if (to.meta.auth && !store.getters['UserModule/token']) {
    next({
      name: 'login'
    })
  } else {
    next()
  }
})


new Vue({
  router,
  store,
//  apolloProvider,
  render: h => h(App)
}).$mount('#app')

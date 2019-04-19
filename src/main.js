import Vue from 'vue'
import './cube-ui'
import App from './App.vue'
import 'amfe-flexible'

import router from './router'
import store from './store'

import './assets/css/main.css'

Vue.config.productionTip = false

// Vue.prototype.$router = router

const vm = new Vue({
  router, // 在Vue应用程序上 注入 路由系统
  store,
  render: h => h(App)
}).$mount('#app')

// 添加toast
Vue.prototype.$toast = vm.$createToast(store.state.toastOpts)

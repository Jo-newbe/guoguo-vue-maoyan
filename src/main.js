import Vue from 'vue'
import './cube-ui'
import App from './App.vue'
import 'amfe-flexible'

import router from './router'

Vue.config.productionTip = false

// Vue.prototype.$router = router

new Vue({
  router, // 在Vue应用程序上 注入 路由系统
  render: h => h(App)
}).$mount('#app')

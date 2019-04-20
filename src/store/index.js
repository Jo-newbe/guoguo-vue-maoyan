import Vue from 'vue'
import Vuex from 'vuex'

import city from './modules/city'
import toast from './modules/toastOptions'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    city,
    toast
  }
})

export default store

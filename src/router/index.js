import Vue from 'vue'
import VueRouter from 'vue-router'

import CityList from 'pages/CityList'
import Movie from 'pages/Movie'
import HottingList from 'pages/Movie/HottingList'
import ComingList from 'pages/Movie/ComingList'
import Cinema from 'pages/Cinema'
import My from 'pages/My'

Vue.use(VueRouter)

// 定义路由系统
// 1 创建路由实例 获取存储所有的路a由
const router = new VueRouter({
  linkActiveClass: 'active', // 配置全局的router-link激活样式
  routes: [
    { path: '/', redirect: '/movie/.n-hot', name: 'home' },
    { path: '/city-list', component: CityList, name: 'cityList' },
    {
      path: '/movie',
      component: Movie,
      name: 'movie',
      children: [
        { path: '.n-hot', component: HottingList, name: 'hotList' },
        { path: '.f-hot', component: ComingList, name: 'comingList' }
      ]
    },
    { path: '/cinema', component: Cinema, name: 'cinema' },
    { path: '/my', component: My, name: 'my' }
  ]
})

export default router

import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  // base: 'yzdd',
  mode: 'history',
  routes: [
    {
      path: '/',
      component: () => import('@/views/home'),
      meta: { title: '首页' }
    }
  ]
})

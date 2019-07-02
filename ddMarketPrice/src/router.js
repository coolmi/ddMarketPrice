import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: () => import('@/views/home'),
      meta: { title: '首页' }
    },
    {
      path: '/report',
      component: () => import('@/views/report'),
      meta: { title: '首页' }
    },
    {
      path: '/hotProduct',
      component: () => import('@/views/hotProduct'),
      meta: { title: '首页' }
    }
  ]
})

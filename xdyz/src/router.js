import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  // base: 'yzdd',
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: () => import('@/views/home'),
      meta: { title: '首页' }
    },
    {
      path: '/weather',
      component: () => import('@/views/weather'),
      meta: { title: '天气预报' }
    },
    {
      path: '/table',
      component: () => import('@/views/table'),
      meta: { title: '环控配置' }
    },
    {
      path: '/environmentalData',
      component: () => import('@/views/environmentalData'),
      meta: { title: '环控数据' }
    },
    {
      path: '/environContrast',
        component: () => import('@/views/environContrast'),
      meta: { title: '环控对比' }
    },
    {
      path: '/environContrastReport',
        component: () => import('@/views/environContrastReport'),
      meta: { title: '环控对比报表' }
    },
    {
      path: '/warning',
      component: () => import('@/views/warning'),
      meta: { title: '警告信息' }
    },
    {
      path: '/reportList',
      component: () => import('@/views/reportList'),
      meta: { title: '报表列表' }
    },
    {
      path: '/reportManage',
      component: () => import('@/views/reportManage'),
      meta: { title: '死淘采食对比' }
    },
    {
      path: '/makeReportManage',
      component: () => import('@/views/makeReportManage'),
      meta: { title: '死淘采食报表' }
    },
    {
      path: '/weekWeight',
        component: () => import('@/views/weekWeight'),
      meta: { title: '周体重' }
    },
    {
      path: '/makeReportWeekWeight',
        component: () => import('@/views/makeReportWeekWeight'),
      meta: { title: '周体重报表' }
    },
    {
      path: '/stBIreport',
      component: () => import('@/views/stBIreport'),
      meta: { title: '死淘采食对比BI报表' }
    },
    {
      path: '/slaughterDay',
      component: () => import('@/views/slaughterDay'),
      meta: { title: '出栏日汇总' }
    },
    {
      path: '/slaughterWerks',
      component: () => import('@/views/slaughterWerks'),
      meta: { title: '出栏鸡场汇总' }
    },
    {
      path: '/stlSum',
      component: () => import('@/views/stlSum'),
      meta: { title: '死淘率汇总' }
    },
    {
      path: '/productionEntry',
      component: () => import('@/views/productionEntry'),
      meta: { title: '生产录入' }
    },
    {
      path: '/productionEntryDetail',
      component: () => import('@/views/productionEntryDetail'),
      meta: { title: '生产录入' }
    }
  ]
})

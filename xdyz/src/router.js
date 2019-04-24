import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/makeReportManage',
      component: () => import('@/views/weather'),
      meta: { title: '天气预报' }
    },
    {
      path: '/table',
      component: () => import('@/views/table'),
      meta: { title: '环控配置' }
    },
    {
      path: '/table',
      component: () => import('@/views/environmentalData'),
      meta: { title: '环控数据' }
    },
    {
      path: '/reportManage',
        component: () => import('@/views/environContrast'),
      meta: { title: '环控对比' }
    },
    {
      path: '/environContrastReport',
        component: () => import('@/views/environContrastReport'),
      meta: { title: '环控对比报表' }
    },
    {
      path: '/table',
      component: () => import('@/views/warning'),
      meta: { title: '警告信息' }
    },
    {
      path: '/reportManage',
      component: () => import('@/views/reportList'),
      meta: { title: '报表列表' }
    },
    {
      path: '/table',
      component: () => import('@/views/reportManage'),
      meta: { title: '死淘采食对比' }
    },
    {
      path: '/makeReportManage',
      component: () => import('@/views/makeReportManage'),
      meta: { title: '死淘采食报表' }
    },
    {
      path: '/makeReportWeekWeight',
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
      path: '/slaughterWerks',
      component: () => import('@/views/slaughterDay'),
      meta: { title: '出栏日汇总' }
    },
    {
      path: '/stlSum',
      component: () => import('@/views/slaughterWerks'),
      meta: { title: '出栏鸡场汇总' }
    },
    {
      path: '/',
      component: () => import('@/views/stlSum'),
      meta: { title: '死淘率汇总' }
    }
  ]
})

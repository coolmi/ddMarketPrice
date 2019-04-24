import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './index'
// import ding from './lib/ding'
import 'element-ui/lib/theme-chalk/index.css';
import { Table, TableColumn } from 'element-ui';
import echarts from 'echarts'
import Popup from 'vux/src/components/popup/index.vue'
import Checker from 'vux/src/components/checker/checker.vue'
import CheckerItem from 'vux/src/components/checker/checker-item.vue'
import Icon from 'vux/src/components/icon/index.vue'
import Selector from 'vux/src/components/selector/index.vue'
import XButton from 'vux/src/components/x-button/index.vue'
import Box from 'vux/src/components/box/index.vue'
import Sticky from 'vux/src/components/sticky/index.vue'
import Tab from 'vux/src/components/tab/tab.vue'
import TabItem from 'vux/src/components/tab/tab-item.vue'
import Group from 'vux/src/components/group/index.vue'
import InlineLoading from 'vux/src/components/inline-loading/index.vue'
import Calendar from 'vux/src/components/calendar/index.vue'
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false
Vue.component('popup', Popup);
Vue.component('checker', Checker);
Vue.component('checker-item', CheckerItem);
Vue.component('icon', Icon);
Vue.component('selector', Selector);
Vue.component('x-button', XButton);
Vue.component('box', Box);
Vue.component('sticky', Sticky);
Vue.component('tab', Tab);
Vue.component('tab-item', TabItem);
Vue.component('group', Group);
Vue.component('InlineLoading', InlineLoading);
Vue.component('calendar', Calendar);
Vue.component(Table.name, Table);
Vue.component(TableColumn.name, TableColumn);
initVue()
// ding.ddLogin(location.href).then(data => {
//   initVue()
// }).catch((err) => {
//   let dd = window.dd
//   dd.device.notification.alert({
//     message: err.msg.errorMessage || err.msg,
//     title: '提示',
//     buttonName: '确定',
//     onSuccess: function() {
//       // dd.biz.navigation.close()
//     },
//     onFail: function(err) {}
//   });
// })
function initVue() {
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
}

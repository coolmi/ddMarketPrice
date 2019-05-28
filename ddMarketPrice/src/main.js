import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import ding from './lib/ding'
import 'element-ui/lib/theme-chalk/index.css';
import { Table, TableColumn, Select, DatePicker, TimePicker, Tabs, TabPane, Card, Row, Col, Button, Form, FormItem, Option } from 'element-ui';
Vue.config.productionTip = false
Vue.component(Table.name, Table);
Vue.component(TableColumn.name, TableColumn);
Vue.component(Select.name, Select);
Vue.component(Option.name, Option);
Vue.component(DatePicker.name, DatePicker);
Vue.component(TimePicker.name, TimePicker);
Vue.component(Tabs.name, Tabs);
Vue.component(TabPane.name, TabPane);
Vue.component(Card.name, Card);
Vue.component(Row.name, Row);
Vue.component(Col.name, Col);
Vue.component(Button.name, Button);
Vue.component(Form.name, Form);
Vue.component(FormItem.name, FormItem);
// initVue()
ding.getItcode().then(data => {
  initVue()
}).catch((err) => {
  let dd = window.dd
  dd.device.notification.alert({
    message: err.msg.errorMessage || err.msg,
    title: '提示',
    buttonName: '确定',
    onSuccess: function() {
      // dd.biz.navigation.close()
    },
    onFail: function(err) {}
  });
})
function initVue() {
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
}

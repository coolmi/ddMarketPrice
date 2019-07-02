import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import ding from './lib/ding'
// import 'element-ui/lib/theme-chalk/index.css';
// import { Table, TableColumn, Select, DatePicker, Button, TimePicker, Tabs, TabPane, Card, Form, FormItem, Row, Col, Option } from 'element-ui';
import 'vant/lib/index.css';
import { Checkbox, CheckboxGroup, Button, Tab, Tabs, Cell, CellGroup, Field, DatetimePicker, Popup, Toast, Picker, Row, Col, Icon } from 'vant';
Vue.config.productionTip = false
store.dispatch('saveURL', location.href)
// Vue.component(Table.name, Table);
// Vue.component(TableColumn.name, TableColumn);
// Vue.component(Select.name, Select);
// Vue.component(Option.name, Option);
// Vue.component(DatePicker.name, DatePicker);
// Vue.component(TimePicker.name, TimePicker);
// Vue.component(Tabs.name, Tabs);
// Vue.component(TabPane.name, TabPane);
// Vue.component(Card.name, Card);
// Vue.component(Button.name, Button);
// Vue.component(Row.name, Row);
// Vue.component(Col.name, Col);
// Vue.component(Form.name, Form);
// Vue.component(FormItem.name, FormItem);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(Button);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Field);
Vue.use(DatetimePicker);
Vue.use(Popup);
Vue.use(Toast);
Vue.use(Picker);
Vue.use(Row);
Vue.use(Col);
Vue.use(Icon);
Vue.use(Tab);
Vue.use(Tabs);
// initVue()
ding.ddLogin(location.href).then(data => {
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

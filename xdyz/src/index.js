import Vue from 'vue';
import Vuex from 'vuex';
import ddstate from '../src/store/modules/ddstate'
import loading from '../src/store/modules/loading'
import item from '../src/store/modules/item'

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
    modules: {
      ddstate,
      loading,
      item
    },
    strict: debug
});

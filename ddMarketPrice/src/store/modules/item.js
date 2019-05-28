const state = {
  time: ''
}

const actions = {
  saveTime({ commit }, time) {
    commit('SAVE_TIME', time);
  },
  clearTime({ commit }) {
    commit('CLEAR_TIME');
  }
}

const mutations = {
  'SAVE_TIME'(state, time) {
    state.time = time
  },
  'CLEAR_TIME'(state) {
    state.time = ''
  }
}

const getters = {
    getTime: state => state.time
}

export default {
  state,
  mutations,
  actions,
  getters
}

import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    // 存储token
    token: localStorage.getItem('token') ? localStorage.getItem('token') : '',
    activeName: 'toudi',
    n: 1
  },

  mutations: {
    save (state, val) {
      state.activeName = val
    },
    savetoudi (state, val) {
      state.n = val
    }
  }
})
export default store

import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    // 存储token

    token: localStorage.getItem('token') ? localStorage.getItem('token') : '',
    activeName: 'toudi',
    n: 1,
    collectionList: new Set()
  },

  mutations: {
    save (state, val) {
      state.activeName = val
    },
    savetoudi (state, val) {
      state.n = val
    },
    saveCollection (state, val) {
      state.collectionList.add(val)
    },
    delCollection (state, val) {
      state.collectionList.delete(val)
      console.log(state.collectionList)
    }
  }
})
export default store

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Vuex from 'vuex'
import axios from 'axios'
import Qs from 'qs'
import myuitls from './js/util'
import { Tabbar, TabbarItem, NavBar, Icon } from 'vant'
import less from 'less'
Vue.use(ElementUI).use(Vuex).use(Tabbar).use(TabbarItem).use(NavBar).use(less).use(Icon)
Vue.prototype.qs = Qs
Vue.prototype.axios = axios
Vue.prototype.myuitls = myuitls
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

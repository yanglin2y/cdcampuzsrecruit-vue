// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import { Notify, Tabbar, TabbarItem, NavBar, Icon, Search, Tab, Tabs, List, Sticky, PullRefresh, Divider, Form, Field, Image as VanImage, GoodsAction, GoodsActionIcon, GoodsActionButton, Dialog, DropdownMenu, DropdownItem } from 'vant'
import Router from 'vue-router'
import Vuex from 'vuex'
import axios from 'axios'
import Qs from 'qs'
import myuitls from './js/util'
import less from 'less'
import store from './vuex/store.js'

Vue.use(DropdownMenu)
Vue.use(DropdownItem)

// 全局注册
Vue.use(Dialog)
Vue.use(GoodsAction)
Vue.use(GoodsActionButton)
Vue.use(GoodsActionIcon)
Vue.use(VanImage)

Vue.use(Divider)
Vue.use(Notify)
Vue.use(Tab)
Vue.use(Tabs)
Vue.use(Form)
Vue.use(Field)
Vue.use(Router)
Vue.use(ElementUI).use(Vuex).use(Tabbar).use(TabbarItem).use(NavBar).use(less).use(Icon).use(Search).use(List).use(Sticky).use(PullRefresh)
Vue.prototype.qs = Qs
Vue.prototype.axios = axios
Vue.prototype.myuitls = myuitls
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
let config = {
  cdcrToken: localStorage.getItem('token')
}
axios.create(config)
const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
axios.interceptors.request.use(config => {
  // 为请求头添加Authorization字段为服务端返回的token
  config.headers.cdcrToken = localStorage.getItem('token')
  // return config是固定用法 必须有返回值
  return config
})

axios.interceptors.response.use(function (response) {
  return response
}, function (error) {
  console.log(error)
  let response = error.response
  const status = response.status
  console.log(response.data)
  if (status === 401) {
    // 判断状态码是401 跳转到登录
    Notify({ type: 'danger', message: '请先登陆' })
    router.push({ path: '/user/login' })
  }
  if (status === 500) {
    Notify({ type: 'danger', message: '服务器异常' })
  }
  return Promise.reject(error)
})

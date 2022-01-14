import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login.vue'
import RegisterApUser from '../components/RegisterApUser.vue'
import myinfo from '../components/MyInfo.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/user/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/user/registerApUser',
      name: 'RegisterApUser',
      component: RegisterApUser
    }, {
      path: '/myinfo',
      name: 'MyInfo',
      component: myinfo
    }
  ]
})

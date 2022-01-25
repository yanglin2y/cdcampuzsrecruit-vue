import Vue from 'vue'
import Router from 'vue-router'
import Login from '../page/Login.vue'
import RegisterApUser from '../page/RegisterApUser.vue'
import myinfo from '../page/MyInfo.vue'
import Home from '../page/Home.vue'
import mymessage from '../page/MyMessage.vue'
import OnlineResume from '../page/OnlineResume.vue'
import experienceInfo from '../page/experienceInfo.vue'
import EducationInfo from '../page/educationInfo.vue'
import ProjectInfo from '../page/projectInfo.vue'
import UpdateEducationInfo from '../page/Update_EducationInfo.vue'
import UpdateExperienceInfo from '../page/Updata_ExperienceInfo.vue'
import UpdateProjectInfo from '../page/Updata_ProjectInfo.vue'
import personinfo from '../page/PersonInfo.vue'
import showtoudi from '../page/Show_Toudi.vue'
import showjob from '../page/Show_Job.vue'
import deliveryRecord from '../page/Delivery_Record.vue'
import positionCollection from '../page/Position_Collection.vue'
import showEnt from '../page/Show_Ent.vue'
import showHR from '../page/Show_Hr.vue'
import search from '../page/Search.vue'
Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        keepAlive: true // 需要缓存
      }
    },
    {
      path: '/user/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/user/register',
      name: 'RegisterApUser',
      component: RegisterApUser
    }, {
      path: '/myinfo',
      name: 'MyInfo',
      component: myinfo
    }, {
      path: '/home',
      name: 'Home',
      component: Home,
      meta: {
        keepAlive: true // 需要缓存
      }
    }, {
      path: '/mymessage',
      name: 'mymessage',
      component: mymessage
    }, {
      path: '/onlineResume',
      name: 'OnlineResume',
      component: OnlineResume
    }, {
      path: '/experienceInfo',
      name: 'ExperienceInfo',
      component: experienceInfo
    }, {
      path: '/educationInfo',
      name: 'EducationInfo',
      component: EducationInfo
    }, {
      path: '/projectInfo',
      name: 'ProjectInfo',
      component: ProjectInfo
    }, {
      path: '/updateEducationInfo',
      name: 'UpdateEducationInfo',
      component: UpdateEducationInfo
    }, {
      path: '/updateExperienceInfo',
      name: 'UpdateExperienceInfo',
      component: UpdateExperienceInfo
    }, {
      path: '/updateProjectInfo',
      name: 'UpdateProjectInfo',
      component: UpdateProjectInfo
    }, {
      path: '/personinfo',
      name: 'personinfo',
      component: personinfo

    }, {
      path: '/showtoudi',
      name: 'showtoudi',
      component: showtoudi
    },
    {
      path: '/showjob',
      name: 'showjob',
      component: showjob

    },
    {
      path: '/deliveryRecord',
      name: 'deliveryRecord',
      component: deliveryRecord

    },
    {
      path: '/positionCollection',
      name: 'positionCollection',
      component: positionCollection
    },
    {
      path: '/showEnt',
      name: 'showEnt',
      component: showEnt
    },
    {
      path: '/showHR',
      name: 'showHR',
      component: showHR
    },
    {
      path: '/search',
      name: 'search',
      component: search
    }

  ]
})
// router.beforeEach((to, from, next) => {
//   if (to.path === '/showEnt' && from.path === '/showjob' && localStorage.getItem('lasterRouter') === to.path) {
//     console.log(localStorage.getItem('lasterRouter'))
//     next('/home')
//   } else {
//     localStorage.setItem('lasterRouter', from.path)
//     next()
//   }
// })

export default router

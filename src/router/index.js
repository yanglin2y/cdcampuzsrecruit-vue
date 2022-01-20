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
      component: Home
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

    }

  ]
})

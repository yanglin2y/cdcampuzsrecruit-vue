<!--  -->
<template>
  <div class="bigbox" v-cloak v-if="this.$route.params.itemObj!==null">
    <van-sticky :offset-top="0.0001" class="headerTitile">
      <van-nav-bar title="职位详细">
        <template #left>
          <van-icon name="arrow-left" color="black" size="24" @click="goto()" />
        </template>
      </van-nav-bar>
    </van-sticky>
    <div class="content">
      <div class="jobInfo">
        <div class="rpName">{{ this.$route.params.itemObj.rpName }}</div>
        <div class="rpInfo">
          <span style="color: #ff9912">{{ salaryList[0] }}K-{{ salaryList[1] }}K</span>/{{
            this.$route.params.itemObj.workAddress
          }}/{{ this.$route.params.itemObj.experience }}/{{
            this.$route.params.itemObj.education
          }}
        </div>
      </div>
      <div class="entInfo" @click="goToEntInfo">
        <div class="entContainer">
          <div class="entName">{{ this.$route.params.itemObj.entName }}</div>
          <div class="entMessage">
            <span style="word-space: nowrap"
              >{{ this.ent.employeesNum }}/{{ this.ent.enterpriseLabel }}</span
            >
          </div>
        </div>
        <div class="img">
          <van-image width="55" height="55"  :src="this.ent.entImg" />
        </div>
      </div>
      <div class="jobDescri">
        <div class="jobDescriName">职位描述</div>
        <div style="margin-top: 0.7rem">
          <p class="jobDlength">
            {{ this.$route.params.itemObj.jobResponsibilities }}
          </p>
        </div>
      </div>
      <div class="hr" @click="goToHrInfo">
        <div class="hrTitle">职位发布者</div>
        <div class="hrContent">
          <div>
            <van-image
              round
              width="4rem"
              height="4rem"
              :src="this.hr.hrImg"
            />
          </div>
          <div class="hrInfo">
            <div style="font-weight: bold; font-size: 1.1rem">{{ this.hr.hrName }}</div>
            <div style="margin-top: 0.4rem; color: grey">
              最近活跃:&nbsp;&nbsp;{{ this.time }}
            </div>
          </div>
        </div>
      </div>
      <div class="workAddress">
        <div class="workAddressName">工作地址</div>
        <div class="trueAddress">
          {{ this.$route.params.itemObj.workAddress }}
        </div>
      </div>
    </div>
    <van-goods-action >
      <van-goods-action-icon icon="star-o"  text="收藏" @click="doCollection"  v-if="!btnDisabled2"/>
      <van-goods-action-icon icon="star" color="#FF9900" text="已收藏" @click="cancelCollection"  v-if="btnDisabled2"/>
      <van-goods-action-button color="#3CB371" type="warning" text="立即沟通" @click="toChat" />
      <template  v-if="this.$route.params.itemObj.state===0">
       <van-goods-action-button color="#16a777" type="danger" text="已下线" @click="addResume" :disabled="true"></van-goods-action-button>
    </template>
      <template v-else-if="this.$route.params.itemObj.state===1 && this.jugResumeItem===false">
  <van-goods-action-button color="#16a777" type="danger" text="立即投递" @click="addResume" :disabled="false"></van-goods-action-button>
    </template>
      <template v-else-if="this.$route.params.itemObj.state===1 && this.jugResumeItem===true">
       <van-goods-action-button color="#16a777" type="danger" text="已经投递" @click="addResume" :disabled="true" ></van-goods-action-button>
    </template>
    </van-goods-action>
  </div>
  <div v-else class="elsebox">
    找不到该职位信息
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》'

export default {
  // import引入的组件需要注入到对象中才能使用
  name: 'show-job',
  props: ['itemObj', 'buttonjug'],
  components: {},
  data () {
    // 这里存放数据
    return {
      btnDisabled2: false,
      btnDisabled: true,
      salaryList: this.$route.params.itemObj.salary.split('-'),
      ent: {},
      hr: {},
      time: '',
      jug: '立即投递',
      jugResumeItem: true,
      rpForm: {
        eid: this.$route.params.itemObj.eid,
        hrid: this.$route.params.itemObj.hrid,
        rpid: this.$route.params.itemObj.rpid,
        rpName: this.$route.params.itemObj.rpName,
        workAddress: this.$route.params.itemObj.workAddress,
        education: this.$route.params.itemObj.education,
        salary: this.$route.params.itemObj.salary,
        experience: this.$route.params.itemObj.experience,
        entName: this.$route.params.itemObj.entName,
        entImg: this.$route.params.itemObj.entImg,
        apEducation: localStorage.getItem('education')
      }
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  beforeCreate () {
    setTimeout(() => {
      this.jugResume()
    }, 0)
  },
  created () {
    setTimeout(() => {
      if (this.$route.params.itemObj === null) {
        this.$notify({ color: 'grey', message: '该职位已经下架' })
        this.$router.back()
      }
      this.selectEnt()
      this.selectHr()
      this.jugCollection()
      // this.getState()
    }, 11)
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
  },
  // 方法集合
  methods: {
    toChat () {
      const params = new URLSearchParams()
      params.append('hrid', this.hr.hrid)
      params.append('hrImg', this.hr.hrImg)
      params.append('hrName', this.hr.hrName)

      this.axios
        .post('/api/relation/addRelation', params)
        .then((res) => {
          if (res.data.code === '000000') {
          } else if (res.data.code === '111111') {
          }
        })
        .catch(function (error) {
          console.log(error)
        })
      this.$router.replace({
        name: 'chat',
        params: {
          hrid: this.hr.hrid,
          hrImg: this.hr.hrImg,
          hrName: this.hr.hrName,
          itemObj: this.$route.params.itemObj
        }
      })
    },
    goToEntInfo () {
      this.$router.push({
        name: 'showEnt',
        params: {
          itemObj: this.ent,
          rpObj: this.$route.params.itemObj
        }
      })
    },
    goToHrInfo () {
      this.$router.replace({
        name: 'showHR',
        params: {
          itemObj: this.hr,
          rpObj: this.$route.params.itemObj,
          entObj: this.ent
        }
      })
    },
    addCollection () {
      const params = new URLSearchParams()
      params.append('rpid', this.$route.params.itemObj.rpid)
      this.axios
        .post('/api/collection/addCollection', params)
        .then((res) => {
          if (res.data.code === '000000') {
            this.$notify({ type: 'success', message: '收藏成功' })
            this.$store.commit('saveCollection', this.$route.params.itemObj.rpid)
            this.btnDisabled2 = true
            this.jugCollection()
          } else if (res.data.code === '111111') {
            this.$notify({ type: 'warning', message: '收藏失败' })
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    delCollection () {
      const params = new URLSearchParams()
      params.append('rpid', this.$route.params.itemObj.rpid)
      this.axios
        .post('/api/collection/delCollection', params
        )
        .then((res) => {
          if (res.data.code === '000000') {
            this.btnDisabled2 = false
            this.$notify({ type: 'success', message: '取消收藏成功' })
            this.$store.commit('delCollection', this.$route.params.itemObj.rpid)
          } else if (res.data.code === '111111') {
            this.$notify({ type: 'warning', message: res.data.message })
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    cancelCollection () {
      this.$dialog.confirm({
        message: '是否取消收藏'
      })
        .then(() => {
          this.delCollection()
        })
        .catch(() => {
          // on cancel
        })
    },
    doCollection () {
      this.$dialog.confirm({
        message: '是否收藏'
      })
        .then(() => {
          this.addCollection()
        })
        .catch(() => {
          // on cancel
        })
    },
    jugCollection () {
      for (var i of this.$store.state.collectionList) {
        if (this.$route.params.itemObj.rpid === i) {
          this.btnDisabled2 = true
        }
      }
    },
    goto () {
      this.$router.back()
    },
    selectEnt () {
      this.axios
        .get('/api/ent/selectEntInfoByEid', {
          params: { eid: this.$route.params.itemObj.eid }
        })
        .then((res) => {
          if (res.data.code === '000000') {
            this.ent = res.data.data
            this.rpForm.entImg = this.ent.entImg
          } else if (res.data.code === '111111') {
            this.$notify({ type: 'warning', message: res.data.message })
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    selectHr () {
      this.axios
        .get('/api/hr/selectHrInfoByHrId', {
          params: { hrid: this.$route.params.itemObj.hrid }
        })
        .then((res) => {
          if (res.data.code === '000000') {
            this.hr = res.data.data
            this.getTime()
          } else if (res.data.code === '111111') {
            this.$notify({ type: 'warning', message: res.data.message })
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    jugResume () {
      this.axios
        .get('/api/resume/jugResume', {
          params: { rpid: this.$route.params.itemObj.rpid }
        })
        .then((res) => {
          if (res.data.code === '000000') {
            this.jugResumeItem = res.data.data
          } else {
            this.jugResumeItem = false
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    getTime () {
      var d2 = new Date()
      var d1 = new Date(this.hr.lastLogin)
      var date2 = d2.getTime() - d1.getTime()
      var dayDiff = Math.floor(date2 / (24 * 3600 * 1000))// 计算出相差天数
      var leave1 = date2 % (24 * 3600 * 1000) // 计算天数后剩余的毫秒数
      var hours = Math.floor(leave1 / (3600 * 1000))// 计算出小时数
      var leave2 = leave1 % (3600 * 1000) // 计算小时数后剩余的毫秒数
      var minutes = Math.floor(leave2 / (60 * 1000))// 计算相差分钟数
      if (dayDiff <= 0 && hours > 0) {
        this.time = hours + '小时之前'
      } else if (dayDiff > 0) {
        this.time = dayDiff + '天之前'
      } else if (dayDiff <= 0 && hours <= 0) {
        this.time = minutes + '分钟之前'
      }
    },
    // getState () {
    //   if (this.$route.params.itemObj.state === 0) {
    //     this.jug = '已经下线'
    //     this.btnDisabled = true
    //   } else if (this.$route.params.itemObj.state === 1 && this.jugResumeItem === false) {
    //     this.jug = '立即投递'
    //     this.btnDisabled = false
    //   }
    // },
    addResume () {
      this.$dialog.confirm({
        message: '是否投递'
      })
        .then(() => {
          this.axios
            .post('/api/resume/addResume', this.qs.stringify(this.rpForm))
            .then((res) => {
              if (res.data.code === '111111') {
                this.$notify({ type: 'warning', message: res.data.message })
              } else if (res.data.code === '000000') {
                this.$notify({ type: 'success', message: res.data.message })
                this.jugResumeItem = true
              } else {
                this.userForm.password = this.userForm.checkPass
                this.$notify({ type: 'warning', message: '服务繁忙, 请重试' })
              }
            })
            .catch(function (error) {
              console.log(error)
            })
        })
        .catch(() => {
          // on cancel
        })
    }
  }
}
</script>
<style lang="less" scoped>
.elsebox{
  background: white;
  width: 100%;
  height: 100vh;
}
[v-cloak] {
    display: none;
}
button[disabled]{
    color:white !important;
}
.trueAddress {
  margin-top: 0.5rem;
  font-size: 1.2rem;
}
.workAddressName {
  margin-top: 2rem;
  font-size: 1.4rem;
  font-weight: bold;
  color: black;
}
.workAddress {
  margin-left: 1.2rem;
  text-align: left;
}
/** HR信息 */
.hrInfo {
  margin-top: 0.2rem;
  margin-left: 1rem;
}
.hrContent {
  display: flex;
  flex-direction: flex-start;
  margin-top: 1rem;
}
.hr {
  margin-left: 1.2rem;
  text-align: left;
  margin-top: 2rem;
}
.hrTitle {
  font-size: 1.4rem;
  font-weight: bold;
  color: black;
}
/**职位描述 */
.jobDlength {
  width: 20rem;
  font-size: 1.07rem;
}
.jobDescri {
  margin-left: 1.2rem;
  text-align: left;
  margin-top: 2rem;
}
.jobDescriName {
  font-size: 1.4rem;
  font-weight: bold;
  color: black;
}
/*职业信息 */
.jobInfo {
  margin-left: 1.2rem;
  text-align: left;
}
.rpInfo {
  margin-top: 0.1rem;
  font-size: 1.12rem;
}
.rpName {
  font-size: 2rem;
  font-weight: bold;
  color: black;
}
/* 企业信息*/
.entContainer {
  display: flex;
  flex-direction: column;
}
.entMessage {
  margin-left: 1.2rem;
  margin-top: 0.2rem;
  font-size: 1.1rem;
  color: grey;
}
.entName {
  margin-left: 1.2rem;
  font-weight: bold;
  font-size: 1.4rem;
  color: black;
}
.entInfo {
  margin-top: 2rem;
  text-align: left;
  display: flex;
  align-items: flex-start;
  width: 100%;
}
.img {
  text-align: right;
  flex: auto;
  margin-right: 1rem;
}
/*大容器*/
.bigbox {
  background: white;
  height: 100vh;
  width: 100%;

}
.content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 1rem;
  height: 85vh;
  overflow-y:hidden ;
  overflow: auto;
}
</style>

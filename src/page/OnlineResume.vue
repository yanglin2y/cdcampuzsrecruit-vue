<!--  -->
<template>
  <div class="bigBox">
    <van-sticky :offset-top="0.0001" class="headerTitile">
      <van-nav-bar title="在线简历">
        <template #left>
          <van-icon name="arrow-left" size="30" @click="gotoMyInfo()" />
        </template>
      </van-nav-bar>
    </van-sticky>
    <div class="containerBox">
      <div class="personInfo">
        <div class="personInfoName">
          {{userObject.apName}}
          <van-icon style="margin-left: 0.8rem" name="edit" @click="gotoPersonInfo()" />
        </div>
        <div class="namecss">{{sex}}/{{age}}岁/{{education}}</div>
        <van-uploader :after-read="afterRead" >
        <el-avatar
          :size="60"
          :src="userObject.apImg"
          class="img"
        ></el-avatar>
        </van-uploader>
      </div>
      <van-divider />
      <div class="experience">
        <div class="commonTitle">实习经历</div>
        <van-icon class="commonIcon" name="plus" size="22" @click=" goto('/experienceInfo')" />
        <experience-item v-for="(n, inx) in exList" :key="inx" :itemObj="n"></experience-item>
        <van-divider />
      </div>
       <div class="experience">
        <div class="commonTitle">教育经历</div>
        <van-icon class="commonIcon" name="plus" size="22" @click="goto('/educationInfo')" />
        <educationitem v-for="(n, inx) in edList" :key="inx" :itemObj="n"></educationitem>
        <van-divider />
      </div>
       <div class="experience">
        <div class="commonTitle">项目经历</div>
        <van-icon class="commonIcon" name="plus" size="22" @click="goto('/projectInfo')" />
        <project-item v-for="(n, inx) in pjList" :key="inx" :itemObj="n"></project-item>
        <van-divider />
      </div>
    </div>
  </div>
</template>

<script>
import educationitem from '../components/Education_Item.vue'
import ExperienceItem from '../components/Experience_Item.vue'
import ProjectItem from '../components/Project_Item.vue'
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》'

export default {
  // import引入的组件需要注入到对象中才能使用
  name: 'RegisterApUser',
  props: ['userinfo'],
  components: {educationitem, ExperienceItem, ProjectItem},
  data () {
    const afterRead = (file) => {
      // 此时可以自行将文件上传至服务器
      const params = new FormData()

      params.append('files', file.file)
      params.append('hrImg', this.userObject.hrImg)
      let config = {
        headers: {'Content-Type': 'multipart/form-data'}
      }
      this.axios
        .post('/api/upload/img', params, config)
        .then((res) => {
          if (res.data.code === '000000') {
            this.$notify({ type: 'success', message: '上传成功' })
            setTimeout(() => {
              this.$router.go(0)
            }, 50)
          } else if (res.data.code === '111111') {
            this.$notify({ type: 'warning', message: res.data.message })
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    }
    return {
      edList: [],
      exList: [],
      pjList: [],
      education: '',
      userObject: {},
      age: '',
      sex: '',
      afterRead
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () { },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    setTimeout(() => {
      this.userInfo()
      this.selectEducationInfoList()
      this.selectWorkInfoList()
      this.selectProjectInfoList()
    }, 100)
  },
  beforeCreate () {}, // 生命周期 - 创建之前
  beforeMount () {}, // 生命周期 - 挂载之前
  beforeUpdate () {}, // 生命周期 - 更新之前
  updated () {}, // 生命周期 - 更新之后
  beforeDestroy () {}, // 生命周期 - 销毁之前
  destroyed () {}, // 生命周期 - 销毁完成
  activated () {}, // 如果页面有keep-alive缓存功能，这个函数会触发
  // 方法集合
  methods: {
    userInfo () {
      this.axios
        .get('/api/user/info')
        .then((res) => {
          if (res.data.code === '000000') {
            this.userObject = res.data.data
            this.getAge(this.userObject.birthday)
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    gotoMyInfo () {
      this.$router.push({ path: '/myinfo' })
    },
    gotoExperienceInfo () {
      this.$router.push({ path: '/experienceInfo' })
    },
    goto (path) {
      this.$router.push({ path: path })
    },
    selectEducationInfoList () {
      this.axios
        .get('/api/myinfo/selectEducationInfoList')
        .then((res) => {
          if (res.data.code === '000000') {
            for (var i in res.data.data) {
              this.edList.push(res.data.data[i])
            }
            this.showEducation()
          } else if (res.data.code === '111111') {
            this.$message(res.data.message)
          } else {
            this.$message('服务繁忙, 请重试')
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    selectWorkInfoList () {
      this.axios
        .get('/api/myinfo/selectWorkInfoList')
        .then((res) => {
          if (res.data.code === '000000') {
            for (var i in res.data.data) {
              this.exList.push(res.data.data[i])
            }
          } else if (res.data.code === '111111') {
            this.$message(res.data.message)
          } else {
            this.$message('服务繁忙, 请重试')
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    selectProjectInfoList () {
      this.axios
        .get('/api/myinfo/selectProjectInfoList')
        .then((res) => {
          if (res.data.code === '000000') {
            for (var i in res.data.data) {
              this.pjList.push(res.data.data[i])
              this.getAge()
            }
          } else if (res.data.code === '111111') {
            this.$message(res.data.message)
          } else {
            this.$message('服务繁忙, 请重试')
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    showEducation () {
      var max = 0
      for (let k in this.edList) {
        if (this.edList[k].education > max) {
          max = this.edList[k].education
        }
      }

      if (max === 1) {
        this.education = '专科'
      } else if (max === 2) {
        this.education = '本科'
      } else if (max === 3) {
        this.education = '硕士'
      } else if (max === 4) {
        this.education = '博士'
      }
      if (this.userObject.sex === 1) {
        this.sex = '男'
      } else {
        this.sex = '女'
      }
    },
    gotoPersonInfo () {
      console.log(this.userObject)
      this.$router.push({
        name: 'personinfo',
        params: {
          userObject: this.userObject
        }
      })
    },
    getAge (val) {
      var r = val.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/)
      if (r == null) return false
      var Y = new Date().getFullYear()
      this.age = Y - r[1]
    }

  }
}
</script>
<style lang="less" scoped>
.containerBox{
  background: white;
 overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
}
.commonIcon {
  display: block;
  float: right;
  margin-top: -1.9rem;
  margin-right: 1.9rem;
}
.commonTitle {
  font-size: 1.3rem;
  width: 10rem;
  font-weight: bold;
}
.experience {
  margin-top: 1rem;
}
.img {
  margin-left: 14rem;
  margin-top: -3rem;
}
.personInfoName {
  font-size: 2rem;
  margin-left: 2rem;
  margin-top: 1rem;
  font-weight: bold;
}
.personInfo {
  text-align: left;
}
/deep/.van-nav-bar__title {
  font-size: 1.5rem;
  color: rgb(95, 94, 94);
}
.namecss {
  font-size: 1.2rem;
  height: 2rem;
  float: left;
  margin-left: 2rem;
  margin-top: 0.4rem;
}
.bigBox {
  height: 100vh;
  width: 100%;
  background: white;

  color: black;
}
.login-container {
  margin-top: 1rem;
  width: 80%;
  margin-left: 3rem;
}
</style>

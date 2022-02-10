<template>

  <div class="mybody">
    <span class="mytitle">我的</span>
    <div class="content">
      <div class="person" @click="goToOnlineResume">

        <div class="imgdiv">
          <el-avatar :size="60"
                     :src="userObject.apImg"></el-avatar>
        </div>
        <div class="namecss">{{userObject.apName}}</div>
        <div class="namecss2">{{sex}}/{{age}}/{{education}}</div>
      </div>
      <div class="qiuzhi">
        <div class="qtitle"> 求职必备</div>
        <div class="qicon1">
          <van-icon name="manager-o"
                    size="2.5rem" />
          <div @click="goToOnlineResume()">我的简历</div>
        </div>
        <div class="qicon2" @click="goToCollection">
          <van-icon name="bag-o"
                    size="2.5rem" />
          <div>职位收藏</div>
        </div>
        <div class="qicon2">
          <van-icon name="label-o"
                    size="2.5rem" />
          <div @click="goToDeliveryRecord">投递记录</div>
        </div>
        <div class="qicon2" @click="goPass">
          <van-icon name="setting-o"
                    size="2.5rem" />
          <div>修改密码</div>
        </div>
      </div>
    </div>
    <van-button class="logout" type="danger" @click="logout" >退出登陆</van-button>
    <mytabbar />
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》'
import mytabbar from '../components/MyTabbar.vue'
export default {
  // import引入的组件需要注入到对象中才能使用
  components: { mytabbar },
  data () {
    // 这里存放数据

    return {
      userObject: {},
      age: '',
      education: '',
      sex: '',
      edList: []
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {

  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    setTimeout(() => {
      this.userInfo()
      this.selectEducationInfoList()
    }, 50)
  },
  beforeCreate () { }, // 生命周期 - 创建之前
  beforeMount () {

  }, // 生命周期 - 挂载之前
  beforeUpdate () { }, // 生命周期 - 更新之前
  updated () {

  }, // 生命周期 - 更新之后
  beforeDestroy () { }, // 生命周期 - 销毁之前
  destroyed () { }, // 生命周期 - 销毁完成
  activated () { }, // 如果页面有keep-alive缓存功能，这个函数会触发
  // 方法集合
  methods: {
    goPass () {
      this.$router.push('/updataPass')
    },
    logout () {
      this.axios
        .get('/api/user/logout')
        .then((res) => {
          if (res.data.code === '000000') {
            this.$notify({ type: 'success', message: '退出成功' })
            this.$router.push('/home')
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    getAge (val) {
      var r = val.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/)
      if (r == null) return false
      var Y = new Date().getFullYear()
      this.age = Y - r[1] + '岁'
    },
    userInfo () {
      this.axios
        .get('/api/user/info')
        .then((res) => {
          if (res.data.code === '000000') {
            this.userObject = res.data.data
            this.getAge(this.userObject.birthday)
            localStorage.setItem('uid', this.userObject.uid)
            localStorage.setItem('apImg', this.userObject.apImg)
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    goToOnlineResume () {
      this.$router.replace({ name: 'OnlineResume' })
    },
    goToCollection () {
      this.$router.replace({ name: 'positionCollection' })
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
    showEducation () {
      var max = 0
      for (let k in this.edList) {
        if (this.edList[k].education > max) {
          max = this.edList[k].education
        }
      }

      if (max === 1) {
        this.education = '专科'
        localStorage.setItem('education', this.education)
      } else if (max === 2) {
        this.education = '本科'
        localStorage.setItem('education', this.education)
      } else if (max === 3) {
        this.education = '硕士'
        localStorage.setItem('education', this.education)
      } else if (max === 4) {
        this.education = '博士'
        localStorage.setItem('education', this.education)
      }
      if (this.userObject.sex === 1) {
        this.sex = '男'
      } else {
        this.sex = '女'
      }
    },
    goToDeliveryRecord () {
      this.$router.push({
        path: 'deliveryRecord'
      })
    }
  }
}

</script>
<style lang='less' scoped>

.logout{
  margin-top:30rem;
  height: 3rem;
  width: 40%;
  font-size: 1.5rem;
}
.qtitle{
  font-size: 1.2rem;
  margin-left: 1.4rem;
  margin-top: .5rem;
  color: black;
  font-weight:bold

}
.qicon1{
  float: left;
  margin-left:2rem;
  margin-top: 1rem;
   text-align: center;
   height: 4rem;
    width: 4rem;
}
.qicon2{
  float: left;
  margin-left:3rem;
    margin-top: 1rem;
  text-align: center;
}
.namecss {
  font-size: 1.4rem;
  width: 15rem;
  height: 2rem;
  float: left;
  margin-left: 0.8rem;
  margin-top: 1rem;
}
.namecss2 {
  font-size: 1rem;
  width: 10rem;
  height: 2rem;
  float: left;
  margin-left: 0.8rem;
  margin-top: 0.4rem;
}
.imgdiv {
  margin-left: 0.8rem;
  margin-top: 0.8rem;
  width: 5rem;
  height: 5rem;
  float: left;
}
.mytitle {
  font-size: 1.4rem;
  color: white;
  padding-top: 1rem;
  display: block;
}
.mybody {
  margin: 0;
  padding: 0;
}
.content {
  display: flex;
  justify-content: space-evenly;
  /*交叉轴上对齐方式为居中*/
  align-items: center;
  flex-direction: column;
}
.person {
  background: white;
  height: 7rem;
  width: 96%;
  border-radius: 0.4rem;
  margin-top: 1.8rem;
  text-align: left;
}

.qiuzhi {
  background: white;
  height: 9rem;
  width: 100%;
  margin-top: 1rem;
   border-radius: 0.4rem;
  text-align: left;
}
</style>

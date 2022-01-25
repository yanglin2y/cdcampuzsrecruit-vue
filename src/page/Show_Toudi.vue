<!--  -->
<template>
  <div class="bigbox">
    <van-sticky :offset-top="0.0001" class="headerTitile">
      <van-nav-bar title="">
        <template #left>
          <van-icon color="white" name="arrow-left" size="23" @click="goto()" />
        </template>
      </van-nav-bar>
    </van-sticky>
    <div class="content" @click="goEntInfo()">
      <div class="message">{{this.message}}</div>
      <div class="time">{{this.$route.params.itemObj.createTime.replaceAll('-','/')}}</div>
      <div class="intercontent">
        <div class="box">
          <div class="rpname">{{this.$route.params.itemObj.rpName}}</div>
          <div class="allname"><span style="white-space:nowrap">{{this.$route.params.itemObj.entName}}｜{{this.$route.params.itemObj.workAddress}}｜{{this.$route.params.itemObj.education}}｜{{this.$route.params.itemObj.experience}}</span></div>
          <div class="salary">{{salaryList[0]}}K-{{salaryList[1]}}K</div>
        </div>
        <div class="img">
          <van-image width="55" height="55" src="https://img01.yzcdn.cn/vant/cat.jpeg" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》'

export default {
  // import引入的组件需要注入到对象中才能使用
  name: 'show-toudi',
  components: {},
  props: ['itemObj'],
  data () {
    // 这里存放数据
    return {
      salaryList: this.$route.params.itemObj.salary.split('-'),
      message: '',
      n: this.$store.state.n,
      rpInfo: {}
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {
    'n': {
      handler (newValue, oldValue) {
        if (this.n === 1) {
          this.message = '投递成功'
        } else if (this.n === 2) {
          this.message = '简历已经被HR查看'
        } else if (this.n === 3) {
          this.message = '简历已经通过初筛'
        } else if (this.n === 4) {
          this.message = '不合适'
        }
      },
      deep: true,
      immediate: true
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {},
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    setTimeout(() => {
      this.selectPostion()
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
    goto () {
      this.$router.back()
    },
    selectPostion () {
      this.axios
        .get('/api/position/selectPostionById', {
          params: { id: this.$route.params.itemObj.rpid }
        })
        .then((res) => {
          if (res.data.code === '000000') {
            this.rpInfo = res.data.data
          } else if (res.data.code === '111111') {
            this.$notify({ type: 'warning', message: res.data.message })
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    goEntInfo () {
      this.$router.push({
        name: 'showjob',
        params: {
          itemObj: this.rpInfo
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
.bigbox {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(rgb(22, 167, 119) 15%, #f1f2f7 15%);
}
.van-nav-bar {
  background-color: rgb(22, 167, 119);
  border: 0px;
}
/deep/ .van-nav-bar__title {
  color: white !important;
}
.van-hairline--bottom:after {
  border-bottom-width: 0px;
}
/deep/.van-nav-bar__left {
  color: white;
}
.content {
  display: flex;
  flex-direction: column;
  width: 90%;
  height: 20vh;
}
.intercontent {
  background: white;
  border-radius: 0.5rem;
  height: 8rem;
  width: 100%;
  display: flex;
  margin-top: 0.5rem;
  flex-direction: flex-start;
}
.box {
  border-radius: 0.3rem;
  align-self: flex-start;
  display: flex;
  flex-direction: column;
}
.message {
  align-self: flex-start;
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
}
.time{
    align-self: flex-start;
     color: white;
}
.rpname {
  margin-left: .8rem;
  margin-top: 0.7rem;
  display: flex;
  font-weight: bold;
  font-size: 1.5rem;
}
.allname {
  margin-left: .8rem;
  display: flex;
  font-size: .2rem;
}
.salary {
  margin-left: .8rem;
  display: flex;
    color: #18bb85;;
  font-weight: bold;
}
.img {
  flex: auto;
  text-align: right;
  margin-top: 1rem;
  margin-right: .7rem;
}
</style>

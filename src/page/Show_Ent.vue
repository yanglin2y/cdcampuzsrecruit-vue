<!--  -->
<template>
  <div class="bigbox" v-cloak>
    <van-sticky :offset-top="0.0001" class="headerTitile">
      <van-nav-bar title="公司详细">
        <template #left>
          <van-icon name="arrow-left" color="black" size="24" @click="goto()" />
        </template>
      </van-nav-bar>
    </van-sticky>
    <div class="content">
      <div class="entInfo">
        <div class="entContainer">
          <div class="entName">{{ this.$route.params.itemObj.entName }}</div>
          <div class="entMessage">
            <span style="word-space: nowrap"
              >{{ this.$route.params.itemObj.employeesNum }}/{{
                this.$route.params.itemObj.enterpriseLabel
              }}</span
            >
          </div>
        </div>
        <div class="img">
          <van-image width="55" height="55" :src="this.$route.params.itemObj.entImg" />
        </div>
      </div>
      <div class="workAddress">
        <div class="workAddressName">公司介绍</div>
        <div class="trueAddress2">
          {{ this.$route.params.itemObj.companyIntroduction }}
        </div>
      </div>
      <div class="workAddress">
        <div class="workAddressName">工作地址</div>
        <div class="trueAddress">
          {{ this.$route.params.itemObj.address }}
        </div>
      </div>
      <div class="bigcontext">
        <div class="workAddressName">还招以下岗位</div>
        <div class="box">
          <div class="context" v-for="(n, inx) in entList" :key="inx" @click="showMsg()">
            <div class="mincontext">
              <div style="font-weight: bold; font-size: 1.3rem">{{ n.rpName }}</div>
              <div class="salary" style="font-weight: bold; color: red">
                {{ n.salary.split("-")[0] }}K-{{ n.salary.split("-")[1] }}K
              </div>
            </div>
            <div style="color: grey">
              {{ n.workAddress }}/{{ n.experience }}/{{ n.education }}
            </div>
          </div>
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
  name: 'show-job',
  props: ['itemObj', 'rpObj'],
  components: {},
  data () {
    // 这里存放数据
    return {
      // salaryList: this.entList.salary.split('-'),
      entList: []
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 生命周期 - 创建完成（可以访问当前this实例）
  beforeCreate () {},
  created () {
    setTimeout(() => {
      this.selectPostionByEnt()
      // this.getState()
    }, 11)
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {},
  beforeMount () {}, // 生命周期 - 挂载之前
  beforeUpdate () {}, // 生命周期 - 更新之前
  updated () {}, // 生命周期 - 更新之后
  beforeDestroy () {}, // 生命周期 - 销毁之前
  destroyed () {}, // 生命周期 - 销毁完成
  activated () {}, // 如果页面有keep-alive缓存功能，这个函数会触发
  // 方法集合
  methods: {
    goto () {
      this.$router.replace({
        name: 'showjob',
        params: {
          itemObj: this.$route.params.rpObj
        }
      })
      // this.$router.back()
    },
    selectPostionByEnt () {
      const params = new URLSearchParams()
      params.append('eid', this.$route.params.itemObj.eid)
      this.axios
        .get('/api/position/selectPostionByEnt', {
          params: {
            eid: this.$route.params.itemObj.eid
          }
        })
        .then((res) => {
          if (res.data.code === '000000') {
            this.entList = res.data.data
          } else if (res.data.code === '111111') {
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    showMsg () {
      this.$router.replace({
        name: 'showjob',
        params: {
          itemObj: this.$route.params.rpObj
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
button[disabled] {
  color: white !important;
}
.box{
 height: 40vh;
  overflow-y: auto;
}
.bigcontext {
  width: 100%;
  text-align: left;
  margin-left: 1.2rem;
  height: 50vh;
}
.salary {
  flex: auto;
  text-align: right;
  margin-right: 2rem;
}
.mincontext {
  display: flex;
  flex-direction: flex-start;
}
.context {
  border-bottom: 1px solid rgb(216, 211, 211);
  height: 4rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 0.4rem;
}
.trueAddress2 {
  margin-top: 0.5rem;
  font-size: 1.2rem;
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
  margin-top: 0.4rem;
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
    overflow:hidden
}
.content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 1rem;
}
</style>

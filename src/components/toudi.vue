<!--  -->
<template>
  <div class="bigBox">
    <div class="demo_warp"
         id="my">
      <div style=" border-bottom: 1px solid #f0ebeb;">
        <ul class="tab_tit">
          <li :class="n==1?'active':''"
              @click="n=1">待查看</li>
          <li :class="n==2?'active':''"
              @click="n=2">已查看</li>
          <li :class="n==3?'active':''"
              @click="n=3">通过初筛</li>
          <li :class="n==4?'active':''"
              @click="n=4">不合适</li>
        </ul>
      </div>

      <!-- neirong -->
      <div class="tab_con">
        <div v-show="n==1" class="waitsee">
          <resume-item v-for="(n, inx) in waitForm" :key="inx" :itemObj="n"></resume-item>
        </div>
        <div v-show="n==2">
          <resume-item v-for="(n, inx) in watchForm" :key="inx" :itemObj="n"></resume-item>
        </div>
        <div v-show="n==3">
          <resume-item v-for="(n, inx) in passForm" :key="inx" :itemObj="n"></resume-item>
        </div>
        <div v-show="n==4">
          <resume-item v-for="(n, inx) in nopassForm" :key="inx" :itemObj="n"></resume-item>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ResumeItem from './Resume_Item.vue'
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》'

export default {
  // import引入的组件需要注入到对象中才能使用
  components: {ResumeItem},
  data () {
    // 这里存放数据
    return {
      n: this.$store.state.n,
      waitForm: [],
      watchForm: [],
      passForm: [],
      nopassForm: []
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {
    'n': {
      handler (newValue, oldValue) {
        this.$store.commit('savetoudi', newValue)
      }
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {

  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    setTimeout(() => {
      this.selectAPResumeByUid(0, this.waitForm)
      this.selectAPResumeByUid(1, this.watchForm)
      this.selectAPResumeByUid(2, this.passForm)
      this.selectAPResumeByUid(3, this.nopassForm)
    }, 100)
  },
  beforeCreate () { }, // 生命周期 - 创建之前
  beforeMount () { }, // 生命周期 - 挂载之前
  beforeUpdate () { }, // 生命周期 - 更新之前
  updated () { }, // 生命周期 - 更新之后
  beforeDestroy () { }, // 生命周期 - 销毁之前
  destroyed () { }, // 生命周期 - 销毁完成
  activated () { }, // 如果页面有keep-alive缓存功能，这个函数会触发
  // 方法集合
  methods: {
    selectAPResumeByUid (state, data) {
      this.axios
        .get('/api/resume/selectAPResumeByUid', {params: {state: state}})
        .then((res) => {
          if (res.data.code === '000000') {
            for (var i in res.data.data) {
              data.push(res.data.data[i])
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
    }

  }
}

</script>
<style lang='less' scoped>
//@import url(); 引入公共css类
.waitsee{
  overflow-y: auto;
  height: 82vh;

}
.bigBox {
  height: 100vh;
  width: 100%;
  background: white;
  border-radius: 1rem;
}
.demo_warp .tab_tit {
  font-size: 1.3rem;
  display: flex;
  flex: 1;
}
.demo_warp .active {
  color: black;
  font-weight: bold;
}
.demo_warp ul li {
  list-style: none;
  width: 23%;
  text-align: center;

  margin-top: 0.2rem;
  margin-left: 0.5rem;
}
.demo_warp .tab_con {
  width: 100%;
  height: 100vh;
  text-align: center;

}
</style>

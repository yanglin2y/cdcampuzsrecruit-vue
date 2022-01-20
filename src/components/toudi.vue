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
              @click="n=4">已通过</li>
        </ul>
      </div>

      <!-- neirong -->
      <div class="tab_con">
        <div v-show="n==1">内容一</div>
        <div v-show="n==2">内容二</div>
        <div v-show="n==3">内容三</div>
        <div v-show="n==4">内容四</div>
      </div>
    </div>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》'

export default {
  // import引入的组件需要注入到对象中才能使用
  components: {},
  data () {
    // 这里存放数据
    return {
      n: 1
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

  }
}

</script>
<style lang='less' scoped>
//@import url(); 引入公共css类

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

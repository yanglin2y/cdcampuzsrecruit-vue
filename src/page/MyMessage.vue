<!--  -->
<template>
  <div class="mymessagebody">
    <van-sticky :offset-top="0.0001" class="headerTitile">
      <van-nav-bar title="长大招聘" />
      <van-tabs
        background="rgb(22, 167, 119) "
        color="rgb(22, 167, 119)"
        v-model="activeName"
      >
        <van-tab title-style="color:white;font-size:1.4rem" title="我的消息" name="message">
            <message/>
        </van-tab>
        <keep-alive>
        <van-tab title-style="color:white;font-size:1.4rem" title="我的投递" name="toudi">
          <toudi></toudi>
        </van-tab>
        </keep-alive>
      </van-tabs>
         <mytabbar />
      </van-sticky>

  </div>
</template>

<script>
import Message from '../components/message.vue'
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》'
import mytabbar from '../components/MyTabbar.vue'
import Toudi from '../components/toudi.vue'

export default {
  // import引入的组件需要注入到对象中才能使用
  components: { mytabbar, Toudi, Message },
  data () {
    // 这里存放数据
    return {
      activeName: this.$store.state.activeName
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {
    'activeName': {
      handler (newValue, oldValue) {
        this.$store.commit('save', newValue)
      }
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {},
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {},
  beforeCreate () {}, // 生命周期 - 创建之前
  beforeMount () {}, // 生命周期 - 挂载之前
  beforeUpdate () {}, // 生命周期 - 更新之前
  updated () {}, // 生命周期 - 更新之后
  beforeDestroy () {}, // 生命周期 - 销毁之前
  destroyed () {}, // 生命周期 - 销毁完成
  activated () {}, // 如果页面有keep-alive缓存功能，这个函数会触发
  // 方法集合
  methods: {
    onClick () {}
  }
}
</script>
<style lang="less" scoped>
/deep/ .van-tab .van-tab--active{
  color: black;
}
/deep/ .van-tabs--line .van-tabs__wrap {
    height: 2.5rem;
}
/deep/ .van-tab__text .van-tab__text--ellipsis{
  font-size: 2rem;
}
.mymessagebody {
  height: 100%;
  width: 100%;
}
.van-nav-bar {
  background-color: rgb(22, 167, 119);
  border: 0px;
}
.van-hairline--bottom:after {
  border-bottom-width: 0px;
}
.van-icon {
  color: #fff;
}
/deep/ .van-nav-bar__title {
  color: white !important;
  font-size: 1.8rem;
}
</style>

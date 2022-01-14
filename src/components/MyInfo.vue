<template>

  <div class="mybody">
    <span class="mytitle">我的</span>
    <div class="content">

      <div class="person">
        <div class="imgdiv">
          <el-avatar :size="60"
                     src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
        </div>
        <div class="namecss">{{apName}}</div>
        <div class="namecss2">应届毕业生/22岁/本科</div>
      </div>
      <div class="qiuzhi">
        <div class="qtitle"> 求职必备</div>
        <div class="qicon1">
          <van-icon name="manager-o"
                    size="2.5rem" />
          <div>我的简历</div>
        </div>
        <div class="qicon2">
          <van-icon name="bag-o"
                    size="2.5rem" />
          <div>职位收藏</div>
        </div>
        <div class="qicon3">
          <van-icon name="label-o"
                    size="2.5rem" />
          <div>投递记录</div>
        </div>
          <div class="qicon4">
          <van-icon name="chat-o"
                    size="2.5rem" />
          <div>意见反馈</div>
        </div>
      </div>
      <!--
<el-footer>
   <div>
        客服（投诉）电话：4006282835（工作日9:00-18:00)
违法和不良信息举报、未成年人投诉举报渠道同上(投诉举报制度）
客服邮箱：cc@lagou.com 北京市人社局电话：12333
营业执照人力资源服务许可证增值电信业务经营许可证
用戶协议隐私政策
我
      </div>
</el-footer> -->
    </div>
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
      apName: '章三'
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
body {
  margin: 0;
  padding: 0;
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
  margin-left:2rem;
    margin-top: 1rem;
  text-align: center;
}
.qicon3{
  float: left;
  margin-left:2rem;
    margin-top: 1rem;
  text-align: center;
}
.qicon4{
  float: left;
  margin-left:2rem;
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
.van-nav-bar {
  margin: 0;
  padding: 0;
  background: rgb(22, 167, 119);
  // // 因为style标签上有 lang='less'  所以.van-nav-bar__title 可以嵌套到.van-nav-bar里面
  // /* /deep/ 就是把data-v-hash值选择器写到类名的前面 */
  /deep/ .van-nav-bar__title {
    color: white;
  }
}

.qiuzhi {
  background: white;
  height: 9rem;
  width: 96%;
  margin-top: 1rem;
   border-radius: 0.4rem;
  text-align: left;
}
</style>

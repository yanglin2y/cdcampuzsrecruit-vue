<!--  -->
<template>
  <div class="mybody">
    <van-sticky :offset-top="0.0001">
      <van-nav-bar title="长大招聘"> </van-nav-bar>
      <van-search
        class="searchbar"
        v-model="searchValue"
        placeholder="请输入搜索关键词"
        background="rgb(22, 167, 119) "
        input-align="center"
      />
      <div class="qiuzhi">
        <div class="qicon1">
          <van-icon name="diamond" size="1.8rem" />
          <div>职位推荐</div>
        </div>
        <div class="qicon2">
          <van-icon name="cart" size="1.8rem" />
          <div>职位收藏</div>
        </div>
        <div class="qicon2">
          <van-icon name="underway" size="1.8rem" />
          <div>投递记录</div>
        </div>
        <div class="qicon2">
          <van-icon name="label" size="1.8rem" />
          <div>服务公告</div>
        </div>
      </div>
    </van-sticky>
    <div class="messageBox">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          :immediate-check="true"
          :offset="1"
          finished-text="没有更多了"
          @load="onLoad"
        >
            <jobitem v-for="(n, inx) in list" :key="inx" :itemObj="n"></jobitem>
        </van-list>
      </van-pull-refresh>
    </div>
    <mytabbar />
  </div>
</template>

<script>
import mytabbar from '../components/MyTabbar.vue'
import jobitem from '../components/Job_Item.vue'
export default {
  // import引入的组件需要注入到对象中才能使用
  components: { mytabbar, jobitem },
  data () {
    // 这里存放数据
    return {
      total: 0,
      current: 1,
      size: 5,
      list: [],
      loading: false,
      finished: false, // 是否已加载完成，加载完成后不再触发load事件
      refreshing: false, // 下拉状态
      page: 1,
      searchValue: ''
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
  // 方法集合
  methods: {
    selectAllPositionByPage () {
      this.axios
        .get('/api/position/selectAllPositionByPage', {params: {current: this.current, size: this.size}})
        .then((res) => {
          if (res.data.code === '000000') {
            for (var i in res.data.data.records) {
              this.list.push(res.data.data.records[i])
            }
            //  this.list[0].push(res.data.data.records)
            this.total = res.data.data.total
            this.current = this.current + 1
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
    onLoad () { //   滚动条与底部距离小于 offset 时触发  offset可以自定义
      setTimeout(() => {
        if (this.refreshing) {
          this.list = []
          this.refreshing = false
        }

        this.selectAllPositionByPage()
        this.loading = false
        if (this.list.length !== 0 && this.total !== 0 && this.list.length >= this.total) {
          this.finished = true
        }
      }, 1500)
    },
    onRefresh () {
    // 清空列表数据
      this.finished = false
      this.current = 1
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true
      this.onLoad()
    }
  }
}
</script>
<style lang="less" scoped>
/deep/  .van-pull-refresh{
  height: 73vh;
 overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
}
.qicon1 {
  float: left;
  margin-left: 3rem;
  margin-top: 0.4rem;
  text-align: center;
  height: 4rem;
  width: 4rem;
}
.qicon2 {
  float: left;
  margin-left: 3rem;
  margin-top: 0.4rem;
  text-align: center;
}
.qiuzhi {
  background: white;
  height: 4.2rem;
  width: 100%;
  border-radius: 0.4rem;
  text-align: left;
}
/deep/ .van-nav-bar__title {
  color: white !important;
  font-size: 1.7rem;
  margin-left: 1rem;
  margin-top: 1rem;
}
.van-list{
   background: white;
}
.messageBox {
  background: white;
  height: 77vh;

  margin-top: .1rem;
}
.mybody {
  height: 100vh;
  width: 100%;
}
.areaUl {
  margin-top: 0.4rem;
}
.areaUl li {
  float: left;
  margin-left: 0.2rem;
  background: #f2f3f5;
  padding: 0.02rem 0.7rem;
  color: #666;
  font-size: 0.1rem;
  border-radius: 0.2rem 0.2rem 0.2rem 0.2rem;
}
.van-nav-bar {
  background-color: #16a777;
  border: 0px;
}
.van-hairline--bottom:after {
  border-bottom-width: 0px;
}
</style>

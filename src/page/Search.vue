<!--  -->
<template>
  <div class="mybody">
   <van-sticky :offset-top="0.0001" class="headerTitile">
      <van-nav-bar title="搜索">
        <template #left>
          <van-icon name="arrow-left" color="white" size="24" @click="goto()" />
        </template>
      </van-nav-bar>
           <van-search
        class="searchbar"
        v-model="searchValue"
        placeholder="请输入职位、地点、公司"
        background="rgb(22, 167, 119) "
        @keydown.enter="keypush()"
      />
    </van-sticky>
    <div class="messageBox">
      <van-list
      class="vlist"
        v-model="loading"
        :finished="finished"
        :immediate-check="false"
        :offset="1"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <jobitem v-for="(n, inx) in list" :key="inx" :itemObj="n"></jobitem>
      </van-list>
    </div>
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
  created () {},
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {},
  // 方法集合
  methods: {
    keypush () {
      this.list = []
      this.finished = false
      this.current = 1
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true
      this.onLoad()
    },
    seviceInfo () {
      this.$dialog.alert({
        message: '暂无公告'
      })
    },
    selctPostionByCondition () {
      this.axios
        .get('/api/position/selctPostionByCondition', {
          params: { current: this.current, size: this.size, math: this.searchValue }
        })
        .then((res) => {
          if (res.data.code === '000000') {
            for (var i in res.data.data.records) {
              this.list.push(res.data.data.records[i])
            }
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
    onLoad () {
      //   滚动条与底部距离小于 offset 时触发  offset可以自定义
      setTimeout(() => {
        if (this.refreshing) {
          this.list = []
          this.refreshing = false
        }

        this.selctPostionByCondition()
        this.loading = false
        if (
          this.list.length !== 0 &&
          this.total !== 0 &&
          this.list.length >= this.total
        ) {
          this.finished = true
        }
      }, 1100)
    },
    onRefresh () {
      // 清空列表数据
      this.finished = false
      this.current = 1
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true
      this.onLoad()
    },
    goto () {
      this.$router.push('/home')
    }
  }
}
</script>
<style lang="less" scoped>
.vlist{
  height: 87vh;
 overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
}
.messageBox{
  height: 87vh;
  margin-top: .1rem;
}
.mybody{
  height: 100vh;
  width: 100%;
  background: white;
}
/deep/ .van-nav-bar__title {
  color: white !important;
  font-size: 1.4rem;
  border: 0px;
}
.van-nav-bar {
  background-color: #16a777;
  border: 0px;
}
.van-hairline--bottom:after {
  border-bottom-width: 0px;
}
</style>

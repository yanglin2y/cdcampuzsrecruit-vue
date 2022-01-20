<!--  -->
<template>
  <div class="positionListBody">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          :immediate-check="true"
          :offset="300"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <div v-for="(item, key) in list" :key="key" >
            <jobitem v-for="(n, inx) in item" :key="inx" :itemObj="n"></jobitem>
          </div>
        </van-list>
      </van-pull-refresh>
  </div>
</template>

<script>
export default {
  // import引入的组件需要注入到对象中才能使用
  data () {
    // 这里存放数据
    return {
      total: '',
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
    // this.selectAllPosition()
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {

  },
  // 方法集合
  methods: {
    async selectAllPositionByPage () {
      this.axios
        .get('/api/position/selectAllPositionByPage', {params: {current: this.current, size: this.size}})
        .then((res) => {
          if (res.data.code === '000000') {
            this.list.push(res.data.data.records)
            this.total = res.data.data.total
            console.log(this.list)
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

        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1)
        }
        // this.selectAllPositionByPage()
        this.loading = false
        // this.current++
        if (this.list.length >= 40) {
          this.finished = true
        }
      }, 1000)
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
.messageBox {
  background: white;
  height: 70vh;
}
.positionListBody {
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

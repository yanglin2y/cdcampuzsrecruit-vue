<!--  -->
<template>
  <div class="bigbox">
    <van-sticky :offset-top="0.0001" class="headerTitile">
      <van-nav-bar title="搜索">
        <template #left>
          <van-icon name="arrow-left" color="white" size="24" @click="goto()" />
        </template>
      </van-nav-bar>
      <van-search
        class="searchbar"
        v-model="searchValue"
        placeholder="请输入搜索关键词"
        background="rgb(22, 167, 119) "
      />
    </van-sticky>
    <van-dropdown-menu>
      <van-dropdown-item v-model="value1" :options="option1" />
      <van-dropdown-item v-model="value2" :options="option2" />
    </van-dropdown-menu>
    <div class="messageBox">
      <van-list
        v-model="loading"
        :finished="finished"
        :immediate-check="true"
        :offset="3"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <jobitem v-for="(n, inx) in list" :key="inx" :itemObj="n"></jobitem>
      </van-list>
    </div>
    <!-- <div class="context">

    </div> -->
  </div>
</template>

<script>
import showsearch from '../components/show_search.vue'
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》'

export default {
  // import引入的组件需要注入到对象中才能使用
  components: { showsearch },
  data () {
    // 这里存放数据
    return {
      total: 0,
      current: 1,
      size: 5,
      list: [],
      loading: false,
      finished: false, // 是否已加载完成，加载完成后不再触发load事件
      page: 1,
      value1: 0,
      value2: 'a',
      option1: [
        { text: '全部商品', value: 0 },
        { text: '新款商品', value: 1 },
        { text: '活动商品', value: 2 }
      ],
      option2: [
        { text: '默认排序', value: 'a' },
        { text: '好评排序', value: 'b' },
        { text: '销量排序', value: 'c' }
      ]
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
  beforeCreate () {}, // 生命周期 - 创建之前
  beforeMount () {}, // 生命周期 - 挂载之前
  beforeUpdate () {}, // 生命周期 - 更新之前
  updated () {}, // 生命周期 - 更新之后
  beforeDestroy () {}, // 生命周期 - 销毁之前
  destroyed () {}, // 生命周期 - 销毁完成
  activated () {}, // 如果页面有keep-alive缓存功能，这个函数会触发
  // 方法集合
  methods: {
    selectAllPositionByPage () {
      this.axios
        .get('/api/position/selectAllPositionByPage', {
          params: { current: this.current, size: this.size }
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

        this.selectAllPositionByPage()
        this.loading = false
        if (
          this.list.length !== 0 &&
          this.total !== 0 &&
          this.list.length >= this.total
        ) {
          this.finished = true
        }
      }, 1100)
    }
  }
}
</script>
<style lang="less" scoped>
.bigbox {
  height: 100vh;
  width: 100%;
  overflow: hidden;
  background: linear-gradient(#16a777 17%, #f1f2f7 17%);
}
.van-nav-bar {
  background-color: #16a777;
  border: 0px;
}
.van-hairline--bottom:after {
  border-bottom-width: 0px;
}
.context {
  width: 100%;
  height: 88vh;
  border: 1px solid black;
  border-radius: 0.5rem;
  background: white;
}
/deep/ .van-nav-bar__title {
  color: white !important;
  font-size: 1.4rem;
}
</style>

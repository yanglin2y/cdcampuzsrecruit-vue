<!--  -->
<template>
  <div class="bigbox">
    <van-sticky :offset-top="0.0001" class="headerTitile">
      <van-nav-bar title="职位收藏">
        <template #left>
          <van-icon name="arrow-left" color="black" size="24" @click="goto()" />
        </template>
      </van-nav-bar>
       <jobitem v-for="(n, inx) in list" :key="inx" :itemObj="n" :buttonjug="true" ></jobitem>
    </van-sticky>
  </div>
</template>

<script>

import jobitem from '../components/Job_Item.vue'

export default {
  // import引入的组件需要注入到对象中才能使用

  components: {jobitem},
  data () {
    // 这里存放数据
    return {
      list: []
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {

  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    setTimeout(() => {
      this.selectCollection()
    }, 300)
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
      this.$router.go(-1)
    },
    selectCollection () {
      this.axios
        .get('/api/collection/selectCollection')
        .then((res) => {
          if (res.data.code === '000000') {
            this.list = res.data.data
            for (var i in this.list) {
              this.$store.commit('saveCollection', this.list[i].rpid)
            }
            //  this.list[0].push(res.data.data.records)
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
<style lang="less" scoped>
/*大容器*/
.bigbox {
  background: white;
  height: 100vh;
  width: 100%;
}
.content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 1rem;
}
</style>

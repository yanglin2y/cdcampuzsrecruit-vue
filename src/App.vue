<template>
  <div id="app">
        <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  mounted () {
    setTimeout(() => {
      this.selectCollection()
    }, 300)
  },
  methods: {
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

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
html,
body {
  font-family: "微软雅黑";
  font-size: 13px;
  /* #f1f2f7 */
  background: linear-gradient(#16a777 13%,#f1f2f7 16%);
  width: 100%;
  height: 100vh;
}
#app {
  margin: 0;
  padding: 0;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  width: 100%;
}
</style>

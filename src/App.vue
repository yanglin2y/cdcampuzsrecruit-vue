<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>

export default {
  name: 'App'
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
  background: linear-gradient(rgb(22, 167, 119) 13%,#f1f2f7 16%);
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

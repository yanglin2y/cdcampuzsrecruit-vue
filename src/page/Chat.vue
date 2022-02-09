<!--  -->
<template>
  <div class="bigbox">
    <van-sticky :offset-top="0.0001"
                class="headerTitile">
      <van-nav-bar :title="this.$route.params.hrName">
        <template #left>
          <van-icon name="arrow-left"
                    size="30"
                    @click="goto()" />
        </template>
      </van-nav-bar>
    </van-sticky>
    <div class="chatBox-middle">
      <div class="chatInfo"
           id="chatInfo">
        <div class="chatUser-box"
             v-for="(item, index) in infoData"
             :key="index"
             :class="[current === item.senderId  ? 'chatUser-box1' : 'chatUser-box']">
          <div class='chatUser-box-img'>
            <van-image round
                       width="2.5rem"
                       height="2.5rem"
                       :src="current == item.senderId ? item.apImg : item.hrImg" />
          </div>
          <div class="chatUser-info">
            <div class="chatUser-info-name"
                 :class="[current == item.senderId  ? 'chatUser-info-name1' : 'chatUser-info-name']">
              <span>{{ item.name }}</span>
              <span class="nowDate">{{ item.time }}</span>
            </div>
            <div class="chatUser-info-text"
                 :class="[current == item.senderId  ? 'chatUser-info-text1' : 'chatUser-info-text']">
              <span>{{ item.msg }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="putmsg">
      <div>
        <el-input v-model="msg"
                  placeholder=" 请输入内容"></el-input>
      </div>
      <div>
        <el-button type="primary"
                   @click="chat()">发送</el-button>
      </div>
    </div>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》'

export default {
  // import引入的组件需要注入到对象中才能使用

  props: ['itemObj', 'hrid', 'hrImg', 'hrName'],
  components: {},
  data () {
    // 这里存放数据
    return {
      current: localStorage.getItem('uid'),
      websock: null,
      msg: '',
      infoData: [
      ]
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {
    this.initWebSocket()
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    window.addEventListener('keydown', this.keyDown)
  },
  beforeCreate () { }, // 生命周期 - 创建之前
  beforeMount () { }, // 生命周期 - 挂载之前
  beforeUpdate () { }, // 生命周期 - 更新之前
  updated () { }, // 生命周期 - 更新之后
  beforeDestroy () {
    setTimeout(() => {

    }, 100)
  }, // 生命周期 - 销毁之前
  destroyed () {
    this.websock.close() // 离开路由之后断开websocket连接
    window.removeEventListener('keydown', this.keyDown, false)
  }, // 生命周期 - 销毁完成
  activated () { }, // 如果页面有keep-alive缓存功能，这个函数会触发
  // 方法集合
  methods: {
    initWebSocket () {
      // 初始化weosocket
      var socket = new WebSocket('ws://127.0.0.1:7888/ws')
      this.websock = socket
      this.websock.onmessage = this.websocketonmessage
      this.websock.onopen = this.websocketonopen
      this.websock.onerror = this.websocketonerror
      this.websock.onclose = this.websocketclose
      this.infoData = JSON.parse(localStorage.getItem(this.$route.params.hrid + '_' + localStorage.getItem('uid'))).data
      console.log('建立连接')
    },
    getNowFormatDate () {
      var date = new Date()
      var seperator1 = '-'
      var seperator2 = ':'
      var month = date.getMonth() + 1
      var strDate = date.getDate()
      if (month >= 1 && month <= 9) {
        month = '0' + month
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate
      }
      var min = date.getMinutes()
      var sec = date.getSeconds()
      if (date.getMinutes() < 10) {
        min = '0' + min
      }
      if (date.getSeconds() < 10) {
        sec = '0' + sec
      }
      var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate +
            ' ' + date.getHours() + seperator2 + min +
            seperator2 + sec
      return currentdate
    },
    websocketonopen () {
      // 连接建立之后执行send方法发送数据
      var data = {
        senderId: localStorage.getItem('uid'),
        receiverId: this.$route.params.hrid,
        hrImg: this.$route.params.hrImg,
        apImg: localStorage.getItem('apImg'),
        time: this.getNowFormatDate(),
        msg: '',
        state: 0
      }
      this.websock.send(JSON.stringify(data))
    },
    websocketonerror () {
      // 连接建立失败重连
      this.initWebSocket()
    },
    websocketonmessage (e) {
      // 数据接收
      this.infoData.push(JSON.parse(e.data))
      var form = {
        data: this.infoData
      }
      localStorage.setItem(this.$route.params.hrid + '_' + localStorage.getItem('uid'), JSON.stringify(form))
    },
    websocketsend (Data) {
      // 数据发送
      this.websock.send(this.qs.stringify(Data))
    },
    websocketclose (e) {
      // 关闭

      console.log('断开连接', e)
    },
    keyDown (e) {
      // 如果是回车则执行登录方法
      if (e.keyCode === 13) {
        this.chat()
      }
    },
    chat () {
      var data = {
        senderId: localStorage.getItem('uid'),
        receiverId: this.$route.params.hrid,
        hrImg: this.$route.params.hrImg,
        apImg: localStorage.getItem('apImg'),
        time: this.getNowFormatDate(),
        msg: this.msg,
        state: 1
      }
      this.infoData.push(data)
      this.websock.send(JSON.stringify(data))
      this.msg = ''
      var form = {
        data: this.infoData
      }
      localStorage.setItem(this.$route.params.hrid + '_' + localStorage.getItem('uid'), JSON.stringify(form))
    },
    goto () {
      if (this.$route.params.itemObj === undefined) {
        this.$router.back()
      } else {
        this.$router.replace({
          name: 'showjob',
          params: {
            itemObj: this.$route.params.itemObj
          }
        })
      }
    }

  }
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类

.chatUser-info-name {
  font-size: 0.875rem;
  color: #888;
  display: flex;
  flex-direction: row;
  }

.nowDate {
  margin: 0 0.625rem;
}
.chatUser-info-text {
  margin-top: 0.3125rem;
  max-width: 20rem;
  padding: 0.5rem;
  background-color: #E8E8E8;
  border-radius: 0.5rem;
  float: left;
  table-layout:fixed;
  word-break: break-all;
  overflow:hidden;
}

.chatUser-info-text span{
  font-size: 0.9375rem;
  line-height: 1.5625rem;
}
.chatUser-box1 {
  flex-direction: row-reverse;
  display: flex;
}
.chatUser-info-name1 {
  justify-content:flex-end
}
.chatUser-info-text1 {
  float: right;
  justify-content:flex-end
}
.chatInfo {
  width: 94%;
  height: 83vh;
  margin: 1.25rem auto;
  overflow: auto;
}
.chatUser-box {
  width: 100%;
  margin-bottom: 6px;
  display: flex;

}

.chatUser-box-img {
  display: flex;
}
.chatUser-box-img1 {
  justify-content:flex-end
}

.chatUser-info {
  margin: 0 1.25rem;
}

.chatUser-info-name {
  font-size: 0.875rem;
  color: #888;
  display: flex;
  flex-direction: row;
}
.chatBox-middle {
  height: 85vh;
  width: 100%;
  display: flex;
  background-color: #fff;
}

.chatBox-infoDesk {
  width: 100%;
  height: 10rem;
}
.van-nav-bar {
  background-color: rgb(230, 235, 233);
  border: 0px;
}
/deep/ [data-v-648c6f6f] .el-input__inner {
  width: 20rem;
  border-bottom: 0px solid white;
  margin-left: 1rem;
  border-radius: 0.2rem;
  margin-top: 1rem;
}
/deep/ .el-button {
  margin-left: 1rem;
  margin-top: 1rem;
}
.putmsg {
  position: fixed;
  /*下面的属性根据实际需求更改*/
  bottom: 0;
  width: 100%;
  height: 5rem;
  display: flex;
  align-items: flex-start;
  background: rgb(230, 235, 233);
}
button[disabled] {
  color: white !important;
}

.bigbox {
  background: white;
  width: 100%;
  height: 100vh;
  background-color: #fff;
}
/deep/.van-nav-bar__title {
  font-size: 1.5rem;
  color: rgb(95, 94, 94);
}
/deep/.el-form-item {
  width: 75%;
  margin-left: 2rem;
}
/deep/ .el-form-item__label {
  height: 2.5rem;
}
/deep/ .el-input {
  height: 3rem;
  font-size: 1.4rem;
}
/deep/ .el-form-item__content {
  padding-left: -10rem;
}

/deep/ .el-input__inner {
  padding: 0px;
  border: 0px;
  border-bottom: 1px solid grey;
  border-radius: 0px;
}
/deep/ .el-date-editor {
  position: relative;
  .el-input__prefix {
    display: none;
  }
}
/deep/ .el-button {
  width: 80%;
  margin-bottom: 1rem;
}
</style>

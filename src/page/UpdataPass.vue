<!--  -->
<template>
  <div class="bigBox">
    <van-sticky :offset-top="0.0001"
                class="headerTitile">
      <van-nav-bar title="修改密码">
        <template #left>
          <van-icon name="arrow-left"  size="26" @click="gotologin()"/>
        </template>
      </van-nav-bar>
    </van-sticky>
    <el-form :model="entForm"
             :rules="rules"
             ref="entForm"
             class="login-container">
      <el-form-item prop="password">
        <el-input type="password"
                  placeholder="请输入密码"
                  v-model="entForm.password"
                  prefix-icon="el-icon-lock"></el-input>
      </el-form-item>
      <el-form-item prop="checkPass">
        <el-input type="password"
                  placeholder="请再次输入密码"
                  v-model="entForm.checkPass"
                  prefix-icon="el-icon-lock"></el-input>
      </el-form-item>
      <el-form-item class="btn-form">
        <el-button type="primary"
                   @click="submitForm('entForm')">修改</el-button>
      </el-form-item>
    </el-form>
  </div>

</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》'
import utils from '../js/util.js'
export default {
  // import引入的组件需要注入到对象中才能使用
  components: {},
  data () {
    var validatePassword = (rule, value, callback) => {
      let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/
      if (!reg.test(value)) {
        callback(new Error('密码必须是由6-20位字母+数字组合'))
      } else if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.entForm.checkPass !== '') {
          this.$refs.entForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.entForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      rules: {

        password: [{ validator: validatePassword, trigger: 'blur' }],
        checkPass: [{ validator: validatePass2, trigger: 'blur' }]
      },

      entForm: {
        password: '',
        checkPas: ''
      }
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () { },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () { },
  beforeCreate () { }, // 生命周期 - 创建之前
  beforeMount () { }, // 生命周期 - 挂载之前
  beforeUpdate () { }, // 生命周期 - 更新之前
  updated () { }, // 生命周期 - 更新之后
  beforeDestroy () { }, // 生命周期 - 销毁之前
  destroyed () { }, // 生命周期 - 销毁完成
  activated () { }, // 如果页面有keep-alive缓存功能，这个函数会触发
  // 方法集合
  methods: {
    gotologin () {
      this.$router.back()
    },
    logout () {
      this.axios
        .get('/api/user/logout')
        .then((res) => {
          if (res.data.code === '000000') {
            this.$router.push('/user/login')
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.entForm.password = utils.encrypt(this.entForm.password)
          this.axios
            .post('/api/user/updataPass', this.qs.stringify(this.entForm))
            .then((res) => {
              if (res.data.code === '111111') {
                this.entForm.password = this.entForm.checkPass
                this.$notify({ type: 'warning', message: res.data.message })
              } else if (res.data.code === '000000') {
                this.entForm.password = this.entForm.checkPass
                this.$notify({ type: 'success', message: '修改成功，请重新登陆' })
                this.logout()
              } else {
                this.entForm.password = this.entForm.checkPass
                this.$notify({ type: 'warning', message: '服务繁忙, 请重试' })
              }
            })
            .catch(function (error) {
              console.log(error)
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
<style lang='less' scoped>
.bigBox {
  height: 100vh;
  width: 100%;
  background: white;
  position: absolute;
}
.login-container {
  margin-top: 1rem;
  width: 80%;
  margin-left: 3rem;
}
</style>

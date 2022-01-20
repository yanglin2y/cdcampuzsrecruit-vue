<template>
  <div class="loginbody">
    <van-sticky :offset-top="0.0001"
                class="headerTitile">
      <van-nav-bar title="长大直聘登陆">
        <template #left>
          <van-icon name="wap-home-o"
                    size="30" />
        </template>
      </van-nav-bar>
    </van-sticky>
    <div class="title">长大直聘登陆</div>
    <el-form class="login-container"
             :model="userForm"
             :rules="rules"
             ref="userForm">
      <el-form-item prop="account">
        <el-input type="text"
                  placeholder="登陆账户"
                  required="required"
                  v-model="userForm.account"
                  prefix-icon="el-icon-user-solid"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password"
                  placeholder="请输入密码"
                  v-model="userForm.password"
                  prefix-icon="el-icon-lock"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   style="width: 100%"
                   @click="submitForm('userForm')">提交</el-button>
      </el-form-item>
      <el-row style="text-align: left; margin-top: -10px ;">
        <el-link type="primary">忘记密码</el-link>
        <el-link type="primary"
                 style=" margin-left:15rem"
                 @click="doRegister()">用户注册</el-link>
      </el-row>
    </el-form>
  </div>

</template>ç

<script>
import utils from '../js/util.js'
import mytabbar from '../components/MyTabbar.vue'
export default {
  name: 'login',
  components: {
    mytabbar
  },
  data () {
    var validateAccount = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入登陆账户'))
      } else {
        callback()
      }
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    return {
      userForm: {
        account: '',
        password: ''
      },
      rules: {
        account: [{ validator: validateAccount, trigger: 'blur' }],
        password: [{ validator: validatePass, trigger: 'blur' }]
      }
    }
  },
  methods: {
    doRegister () {
      this.$router.push({path: '/user/register'})
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.userForm.password = utils.encrypt(this.userForm.password)
          this.axios
            .post('/api/user/login', this.qs.stringify(this.userForm))
            .then((res) => {
              if (res.data.code === '000000') {
                localStorage.setItem('token', res.data.data.token)
                this.$message({
                  message: '登陆成功',
                  type: 'success'
                })
                this.$router.push({ path: '/home' })
              } else if (res.data.code === '111111') {
                this.$message.error(res.data.message)
                //   location.reload()
                //  this.$router.go(0)
              } else {
                this.$message('服务繁忙, 请重试')
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
.login-container {
  margin-top: 1rem;
  width: 80%;
  margin-left: 3rem;
}
.title {
  font-size: 2rem;
  margin-top: 1.5rem;
  margin-left: -13rem;
}
/deep/ .van-nav-bar__title {
  color: white !important;
  font-size: 1.8rem;
}

.loginbody {
  background: white;
  height: 100vh;
  width: 100%;
  text-align: center;
}
</style>

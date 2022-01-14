<template>
  <div>
    <el-form class="login-container">
      <h1 class="title">用户登录</h1>
      <el-form-item label="">
        <el-input type="text" v-model="userForm.account" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-input type="password" v-model="userForm.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width: 100%" @click="submitForm()">提交</el-button>
      </el-form-item>
      <el-row style="text-align: center; margin-top: -10px ;">
        <el-link type="primary">忘记密码</el-link>
        <el-link type="primary" @click="doRegister()">用户注册</el-link>
      </el-row>
    </el-form>
     <mytabbar></mytabbar>
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
        password: [{ validator: validatePass, trigger: 'blur' }]
      }
    }
  },
  methods: {
    submitForm () {
      this.userForm.password = utils.encrypt(this.password)
      this.axios
        .post('/api/user/login', this.qs.stringify(this.userForm))
        .then((res) => {
          if (res.data.code === '111111') {
            this.$message('登陆成功')
          } else if (res.data.code === '000000') {
            this.$message(res.data.message)
            this.$router.push({path: '/user/login'})
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
<style scoped>
.userform {
  margin-left: -4em;
}
.buuton {
  border: 0px;
  background: rgb(35, 161, 115);
  width: 23em;
}
</style>

<!--  -->
<template>
  <el-form :model="userForm"
           :rules="rules"
           ref="userForm"
           class="demo-ruleForm">
    <el-form-item prop="apName">
      <el-input type="text"
                placeholder="真实姓名"
                required="required"
                v-model="userForm.apName"
                prefix-icon="el-icon-user-solid"></el-input>
    </el-form-item>
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
    <el-form-item prop="checkPass">
      <el-input type="password"
                placeholder="请再次输入密码"
                v-model="userForm.checkPass"
                prefix-icon="el-icon-lock"></el-input>
    </el-form-item>
    <el-form-item prop="iphone">
      <el-input class="phone-input"
                placeholder="手机号"
                v-model="userForm.iphone"
                prefix-icon="el-icon-mobile-phone"></el-input>
    </el-form-item>
      <el-form-item prop="mail">
      <el-input class="phone-input"
                placeholder="邮箱"
                v-model="userForm.mail"
                prefix-icon="el-icon-mobile-phone"></el-input>
    </el-form-item>
    <!-- <el-form-item prop="age">
      <el-input placeholder="请输入年龄"
                v-model.number="userForm.age"
                prefix-icon="el-icon-coordinate"></el-input>
    </el-form-item>
    <el-form-item prop="birthday">
      <el-date-picker class="phone-input"
              value-format="timestamp"
                placeholder="生日日期"
                v-model="userForm.birthday"
                style="width:100%"
                prefix-icon="el-icon-mobile-phone"></el-date-picker>
    </el-form-item>
   <el-form-item prop="sex" prefix-icon="el-icon-mobile-phone">
     <el-select v-model="userForm.sex" placeholder="请选择性别" style="width:100%">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
    </el-form-item>
    <el-form-item prop="city">
      <el-input class="phone-input"
                placeholder="所在地"
                v-model="userForm.city"
                prefix-icon="el-icon-mobile-phone"></el-input>
    </el-form-item>
    <el-form-item class="btn-form">
      <el-button type="primary"
                 @click="submitForm('userForm')">注册</el-button>
    </el-form-item> -->
    <el-form-item class="btn-form">
      <el-button type="primary"
                 @click="submitForm('userForm')">注册</el-button>
    </el-form-item>
  </el-form>

</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》'

export default {
  // import引入的组件需要注入到对象中才能使用
  name: 'RegisterApUser',
  components: {},
  data () {
    var validateSex = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请选择性别'))
      } else {
        callback()
      }
    }
    var validateBirthday = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入生日日期'))
      } else {
        callback()
      }
    }
    var validateIphone = (rule, value, callback) => {
      const phoneReg = /^1[3|4|5|7|8][0-9]{9}$/
      if (!value) {
        return callback(new Error('电话号码不能为空'))
      }
      setTimeout(() => {
      // Number.isInteger是es6验证数字是否为整数的方法,但是我实际用的时候输入的数字总是识别成字符串
      // 所以我就在前面加了一个+实现隐式转换

        if (!Number.isInteger(+value)) {
          callback(new Error('请输入数字值'))
        } else {
          if (phoneReg.test(value)) {
            callback()
          } else {
            callback(new Error('电话号码格式不正确'))
          }
        }
      }, 200)
    }
    var validateEmail = (rule, value, callback) => {
      const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
      if (!value) {
        return callback(new Error('邮箱不能为空'))
      }
      setTimeout(() => {
        if (mailReg.test(value)) {
          callback()
        } else {
          callback(new Error('请输入正确的邮箱格式'))
        }
      }, 100)
    }
    var validateName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入真实姓名'))
      } else {
        callback()
      }
    }
    var validateAccount = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入登陆账户'))
      } else {
        callback()
      }
    }
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('年龄不能为空'))
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'))
        } else {
          if (value > 124) {
            callback(new Error('超出正常人年龄'))
          } else {
            callback()
          }
        }
      }, 500)
    }
    var validatePassword = (rule, value, callback) => {
      let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/
      if (!reg.test(value)) {
        callback(new Error('密码必须是由6-20位字母+数字组合'))
      } else if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.userForm.checkPass !== '') {
          this.$refs.userForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.userForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      rules: {
        sex: [{validator: validateSex, trigger: 'blur'}],
        birthday: [{validator: validateBirthday, trigger: 'blur'}],
        mail: [{validator: validateEmail, trigger: 'blur'}],
        iphone: [{validator: validateIphone, trigger: 'blur'}],
        account: [{validator: validateAccount, trigger: 'blur'}],
        apName: [{validator: validateName, trigger: 'blur'}],
        password: [{ validator: validatePassword, trigger: 'blur' }],
        checkPass: [{ validator: validatePass2, trigger: 'blur' }],
        age: [{ validator: checkAge, trigger: 'blur' }]
      },
      options: [{
        value: '1',
        label: '男'
      }, {
        value: '0',
        label: '女'
      }],
      userForm: {
        apName: '',
        account: '',
        password: '',
        checkPas: '',
        age: '',
        birthday: '',
        sex: '',
        city: '',
        iphone: '',
        mail: ''
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
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.userForm.password = this.myuitls.encrypt(this.password)
          this.axios
            .post('/api/user/registerAPUser', this.qs.stringify(this.userForm))
            .then((res) => {
              if (res.data.code === '111111') {
                this.userForm.password = this.userForm.checkPass
                this.$message(res.data.message)
              } else if (res.data.code === '000000') {
                this.$message(res.data.message)
                this.$router.push({path: '/login'})
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

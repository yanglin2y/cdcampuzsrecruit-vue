<!--  -->
<template>
  <div class="bigbox">
    <van-sticky :offset-top="0.0001"
                class="headerTitile">
      <van-nav-bar title="个人信息">
        <template #left>
          <van-icon name="arrow-left"
                    size="30"
                    @click="goto()" />
        </template>
      </van-nav-bar>
    </van-sticky>
    <el-form :label-position="labelPosition"
             label-width="10px"
             :model="pForm"
             :rules="rules"
             ref="pForm">
      <el-form-item label="姓名">
        <el-input v-model="pForm.apName"
                  placeholder="请填写"></el-input>
      </el-form-item>
      <el-form-item label="出生日期">
        <el-col :span="11">
          <el-date-picker prefix-icon=""
                          value-format="yyyy-MM-dd"
                          placeholder="开始日期"
                          v-model="pForm.birthday"
                          style="width: 100%"></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="性别">
        <el-select v-model="pForm.sex"
                   placeholder="请选择">
          <el-option v-for="item in options"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
        <el-form-item label="所在城市">
          <el-input v-model="pForm.city"
                    placeholder="请填写"></el-input>
        </el-form-item>
        <el-form-item label="手机号码"
                      prop="iphone">
          <el-input v-model="pForm.iphone"
                    placeholder="请填写"></el-input>
        </el-form-item>
        <el-form-item label="邮箱"
                      prop="mail">
          <el-input v-model="pForm.mail"
                    placeholder="请填写"></el-input>
        </el-form-item>
    </el-form>
    <div class="footer">
      <el-button type="primary"
                 @click="submitForm('pForm')"
                 :disabled="btnDisabled">保存</el-button>
    </div>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》'

export default {
  // import引入的组件需要注入到对象中才能使用
  name: 'person-info',
  components: {},
  data () {
    // 这里存放数据
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
    return {
      rules: {
        mail: [{ validator: validateEmail, trigger: 'blur' }],
        iphone: [{ validator: validateIphone, trigger: 'blur' }]
      },
      btnDisabled: true,
      pForm: {
        id: this.$route.params.userObject.id,
        apName: this.$route.params.userObject.apName,
        sex: this.$route.params.userObject.sex,
        birthday: this.$route.params.userObject.birthday,
        city: this.$route.params.userObject.city,
        iphone: this.$route.params.userObject.iphone,
        mail: this.$route.params.userObject.mail,
        apImg: this.$route.params.userObject.apImg
      },
      labelPosition: 'top',
      options: [{
        value: 1,
        label: '男'
      }, {
        value: 0,
        label: '女'
      }]
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {
    'pForm': {
      handler (newValue, oldValue) {
        if (this.pForm.apName !== '' &&
          this.pForm.birthday !== '' &&
          this.pForm.major !== '' &&
          this.pForm.city !== '' &&
          this.pForm.iphone !== '' &&
          this.pForm.mail !== '' && this.pForm.sex !== '') {
          this.btnDisabled = false
        } else {
          this.btnDisabled = true
        }
        if (this.pForm.apName !== this.$route.params.userObject.apName ||
          this.pForm.birthday !== this.$route.params.userObject.birthday ||
          this.pForm.major !== this.$route.params.userObject.major ||
          this.pForm.city !== this.$route.params.userObject.city ||
          this.pForm.iphone !== this.$route.params.userObject.iphone ||
          this.pForm.mail !== this.$route.params.userObject.mail ||
           this.pForm.sex !== this.$route.params.userObject.sex) {
          this.btnDisabled = false
        } else {
          this.btnDisabled = true
        }
      },
      deep: true,
      immediate: true
    }
  },
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
    goto () {
      this.$router.push({ name: 'OnlineResume' })
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.axios
            .post('/api/user/updataUser', this.qs.stringify(this.pForm))
            .then((res) => {
              if (res.data.code === '000000') {
                this.$notify({ type: 'success', message: '添加成功' })
                this.$router.push({ path: '/onlineResume' })
              } else if (res.data.code === '111111') {
                this.$notify({ type: 'warning', message: res.data.message })
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
<style lang="less" scoped>
//@import url(); 引入公共css类
button[disabled] {
  color: white !important;
}
.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  line-height: var(--footer-height);
  text-align: center;
}
.bigbox {
  background: white;
  width: 100%;
  height: 100vh;
  text-align: left;
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

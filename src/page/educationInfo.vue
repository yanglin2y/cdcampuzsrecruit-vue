<!--  -->
<template>
  <div class="bigbox">
    <van-sticky :offset-top="0.0001"
                class="headerTitile">
      <van-nav-bar title="添加教育经历">
        <template #left>
          <van-icon name="arrow-left"
                    size="30"
                    @click="goto()" />
        </template>
      </van-nav-bar>
    </van-sticky>
    <el-form :label-position="labelPosition"
             label-width="10px">
      <el-form-item label="学校名称">
        <el-input v-model="edForm.school"
                  placeholder="请填写"></el-input>
      </el-form-item>
      <el-form-item label="学历">
        <el-select v-model="edForm.education"
                   placeholder="请选择">
          <el-option label="专科"
                     value=1></el-option>
          <el-option label="本科"
                     value=2></el-option>
          <el-option label="硕士"
                     value=3></el-option>
          <el-option label="博士"
                     value=4></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="专业名称">
        <el-input v-model="edForm.major"
                  placeholder="请填写"></el-input>
      </el-form-item>
      <el-form-item label="入校时间">
        <el-col :span="11">
          <el-date-picker prefix-icon=""
                          value-format="yyyy-MM-dd"
                          type="date"
                          placeholder="开始日期"
                          v-model="edForm.startTime"
                          style="width: 100%;"></el-date-picker>
        </el-col>
        <el-col class="line"
                :span="2">-</el-col>
        <el-col :span="11">
          <el-date-picker placeholder="结束日期"
                          value-format="yyyy-MM-dd"
                          v-model="edForm.endTime"
                          style="width: 100%;"></el-date-picker>
        </el-col>
      </el-form-item>
    </el-form>
    <div class="footer">
      <el-button type="primary" @click="addEducationInfo()"  :disabled="btnDisabled">保存</el-button>
    </div>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》'

export default {
  // import引入的组件需要注入到对象中才能使用
  components: {},
  data () {
    // 这里存放数据
    return {
      btnDisabled: true,
      edForm: {
        education: '',
        school: '',
        major: '',
        startTime: '',
        endTime: ''
      },
      labelPosition: 'top'
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {
    'edForm': {
      handler (newValue, oldValue) {
        if (this.edForm.education !== '' &&
         this.edForm.school !== '' &&
         this.edForm.major !== '' &&
         this.edForm.startTime !== '' &&
         this.edForm.endTime !== '') {
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
  created () {

  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {

  },
  beforeCreate () { }, // 生命周期 - 创建之前
  beforeMount () { }, // 生命周期 - 挂载之前
  beforeUpdate () { }, // 生命周期 - 更新之前
  updated () { }, // 生命周期 - 更新之后
  beforeDestroy () { }, // 生命周期 - 销毁之前
  destroyed () { }, // 生命周期 - 销毁完成
  activated () { }, // 如果页面有keep-alive缓存功能，这个函数会触发
  // 方法集合
  methods: {
    test () {
      console.log(this.edForm)
    },
    goto () {
      this.$router.push({ path: '/onlineResume' })
    },
    addEducationInfo () {
      this.axios
        .post('/api/myinfo/addEducationInfo', this.qs.stringify(this.edForm))
        .then((res) => {
          console.log(this.edForm)
          if (res.data.code === '000000') {
            this.$notify({ type: 'success', message: '添加成功' })
            this.$router.push({path: '/onlineResume'})
          } else if (res.data.code === '111111') {
            this.$notify({ type: 'warning', message: res.data.message })
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}

</script>
<style lang='less' scoped>
//@import url(); 引入公共css类
button[disabled]{
    color:white !important;

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

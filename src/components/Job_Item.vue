<template>
  <div class="jobItems" @click="showMsg">
    <div class="jobName">{{itemObj.rpName}}</div>
     <!-- <p>{{itemObj.h2_txt}}</p> -->
       <ul class="areaUl">
        <li>{{itemObj.workAddress}}</li>
       <li>{{itemObj.education}}</li>
       <li>{{itemObj.experience}}</li>
     </ul>
    <br>
    <div class="ent">
           <el-avatar :size="34"
                     src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
          <span>{{itemObj.entName}}&nbsp;&nbsp;&nbsp;&nbsp;{{itemObj.employeesNum}}</span>
    </div>
     <span class="salary">{{salaryList[0]}}K-{{salaryList[1]}}K</span>
  </div>
</template>

<script>
export default {
  name: 'job_item',
  data () {
    return {
      msg: 'dsadadad',
      salaryList: this.itemObj.salary.split('-')
    }
  },
  props: ['itemObj'],
  methods: {
    showMsg () {
      this.$router.push({
        name: 'showjob',
        params: {
          itemObj: this.itemObj
        }
      })
    }
  }
}
</script>

<style scoped>
.ent span{
  margin-bottom: -0.8rem;

}
.ent{
  margin-top: 0.8rem;
  margin-left: -12rem;
}
.jobName{
  font-size: 1.3rem;
  padding-right: 20.7rem;
  padding-top: .5rem;
  font-weight: bold;
  display: block;
}
.jobItems{
  width: 100%;
  height: 9rem;
  border-bottom: 3px solid #eeeeee;
  position: relative;
  margin-top:0.4rem;
}
.areaUl{
  margin-top: .7rem;
  margin-left: 0.7rem;
}
.areaUl li{
  float: left;
  margin-left:0.8rem;
  background:#f2f3f5;
  padding: .02rem 0.7rem;
  color: #666;
  font-size: .1rem;
  border-radius: .2rem .2rem .2rem .2rem;
}

.jobItems p{
  font-size: .2rem;
  color: #666;
  margin-top: 3rem;
  text-align: left;
}
.salary{
  font-size: 1.3rem;
  color: #18bb85;;
  font-weight: bold;
  position: absolute;
  top:.5rem;
  right: 1.3rem;

}
</style>

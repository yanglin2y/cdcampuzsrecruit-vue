<template>
  <div class="BigBox"
       @click="showMsg">
   <div class="img">
      <van-image width="55"
                 height="55"
                 src="https://img01.yzcdn.cn/vant/cat.jpeg" />
    </div>
    <div class="jobName">
      <span class="name1">{{this.itemObj.rpName}}</span>
      <span class="name2">{{this.itemObj.workAddress}} | {{this.itemObj.entName}}</span>
      <span class="salary">{{salaryList[0]}}K-{{salaryList[1]}}K</span>
    </div>
    <!-- <p>{{itemObj.h2_txt}}</p> -->
    <div class="time"><span style=" display: block;">{{this.itemObj.createTime.substring(5,7)}}月{{this.itemObj.createTime.substring(8,10)}}日</span></div>
  </div>
</template>

<script>
export default {
  name: 'resume_item',
  data () {
    return {
      salaryList: this.itemObj.salary.split('-')
    }
  },
  props: ['itemObj'],
  methods: {
    showMsg (val) {
      this.$router.push({
        name: 'showtoudi',
        params: {
          itemObj: this.itemObj,
          message: val
        }
      })
    }
  }
}
</script>

<style  scoped>
.time{
  order: 100;
flex: auto;
text-align: right;
padding-right: 2rem;
padding-top: 0.3rem;
}
.jobName{
   margin-top: 0.4rem;
   padding-left: 0.3rem;
    height: 7rem;
    width: 12rem;
    text-align: left;
    margin-left:0.5rem

}
.name1{
  font-weight: bold;
  font-size: 1.2rem;
  height: 2rem;
}
.name2{
  display: block;
white-space:nowrap
}
.img{
  margin-left: 1.2rem;
  margin-top: .7rem;

}
.BigBox {
  flex-direction:row;
  display: flex;
  width: 100%;
  height: 6rem;
  border-bottom: 1px solid rgb(238, 236, 236);
  flex-wrap: nowrap;
  flex: columns;

}

.salary {
   color: #18bb85;
 font-weight: bold;
   display: block;
white-space:nowrap
}
</style>

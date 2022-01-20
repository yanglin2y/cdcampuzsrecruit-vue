<template>
  <div class="edItems" >
    <div class="school">{{itemObj.school}}</div>
    <div>{{education}}｜{{itemObj.major}}</div>
    <div>{{itemObj.startTime}} 至 {{itemObj.endTime}}</div>
  <van-icon class="icon" name="arrow" size="15" @click="updateEducationInfo()"/>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'dsadadad'
    }
  },
  computed: {
    education: function () {
      if (this.itemObj.education === 1) {
        return '专科'
      } else if (this.itemObj.education === 2) {
        return '本科'
      } else if (this.itemObj.education === 3) {
        return '硕士'
      } else if (this.itemObj.education === 4) {
        return '博士'
      }
    }
  },
  props: ['itemObj'],
  methods: {
    updateEducationInfo () {
      this.$router.push({
        name: 'UpdateEducationInfo',
        params: {
          itemObj: this.itemObj
        }
      })
    }
  }
}
</script>

<style scoped>
.content{
  overflow-y: hidden;
  height: 3rem;
}
.edItems{
  text-align: left;;
  margin-left: 2.5rem;
  margin-top: 1rem;
  margin-bottom:2rem ;
  height: 6rem;
}
.icon{
  position: relative;
  left: 24.1rem;
  top: -3rem;

}
</style>

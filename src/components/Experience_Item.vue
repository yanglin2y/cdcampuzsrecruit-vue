<template>
  <div class="edItems" >
    <div class="school">{{itemObj.entName}}</div>
    <div>{{itemObj.occupation}}</div>
    <div>{{itemObj.startTime}} 至 {{itemObj.endTime}}</div>
    <div style="color:grey;width:20rem;overflow-y:auto;height: 3rem;">
        {{itemObj.content}}
    </div>
    <van-icon class="icon" name="arrow" size="15" @click="gotouUpdateinfo()"/>
  </div>
</template>

<script>
export default {
  name: 'Experience-Info',
  data () {
    return {
      msg: 'dsadadad'
    }
  },
  props: ['itemObj'],
  methods: {
    gotouUpdateinfo () {
      this.$router.push({
        name: 'UpdateExperienceInfo',
        params: {
          itemObj: this.itemObj
        }
      })
    }
  }
}
</script>

<style  scoped>
.content{
  overflow-y: hidden;
  height: 6rem;
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
  top: -5rem;

}
</style>

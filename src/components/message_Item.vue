<template>
  <div class="jobItems"
       @click="showMsg">
    <div class="box">
      <div class="hr">
        <el-avatar :size="50"
                   :src="itemObj.hrImg" class="img"></el-avatar>
      </div>
      <div class="name">{{itemObj.hrName}}</div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  props: ['itemObj'],
  methods: {
    showMsg () {
      this.$router.push({
        name: 'chat',
        params: {
          hrid: this.itemObj.hrid,
          hrImg: this.itemObj.hrImg,
          hrName: this.itemObj.hrName
        }
      })
    }
  }
}
</script>

<style scoped>
.box {
    display: flex;
  flex-direction: row;
  height: 5rem;
  margin-top: .4rem;

}
.img{
  margin-left: 1rem;
}
.name{
  margin-left: 2rem;
  font-size: 1.7rem;
  margin-top: .7rem;

}
.jobItems {
  height: 5rem;
  margin-top: .5rem;
  border-bottom: 1px solid rgb(238, 236, 236);

}
</style>

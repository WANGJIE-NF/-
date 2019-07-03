<template>
  <div class="star">
    <span v-for="(itemClass,index) in itemClasss" class="star-item" :class="itemClass" :key="index"></span>
    <span class="scoreText">{{this.score}}</span>
  </div>
</template>

<script>
const length = 5;
const cla_on = 'on';
const cla_half = 'half';
const cla_off = 'off';

export default {
  name: 'star',
  props: {
    score: {
      type: Number,
      default: ''
    }
  },
  computed: {
    itemClasss(){
      let result = [];
      let score = Math.floor(this.score * 2) / 2;
      let on = Math.floor(score);
      console.log(on.length)

      let half = score % 1 !== 0;
      for(let i = 0; i < on; i++){
        result.push(cla_on);
      }
      if(half){
        result.push(cla_half);
      }
      while(result.length < length){
        result.push(cla_off);
      }
      return result;
    }
  }


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.star-item{
  display: inline-block;
  width: 15px;
  height: 15px;
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
.on{
  background-image: url(./img/star24_on@2x.png)
}
.half{
  background-image: url(./img/star24_half@2x.png)
}
.off{
  background-image: url(./img/star24_off@2x.png)
}
.scoreText{
  margin-left: 3px;
  font-size: 12px;
}
</style>
// 评论中上传的图片展示还需要点击展示
// 点评还没有设计结构

<template>
  <div class="rating" ref="rating">
    <div class="scroll">
      <!-- 所有评分开始 -->
      <div class="overview">
        <div class="overview-left">
          <div class="comment-score">
            <p class="comment-score-number">{{ratings.comment_score}}</p>
            <p class="comment-score-text">商家评分</p>
          </div>
          <div class="other-score">
            <p class="quality-score" v-if="ratings.quality_score">
              <span class="quality-score-text">口味</span>
              <Star :score="ratings.quality_score"></Star>
            </p>
            <p class="pack-score" v-if="ratings.pack_score">
              <span class="pack-score-text">包装</span>
              <Star :score="ratings.pack_score"></Star>
            </p>
          </div>
        </div>
        <div class="overview-right">
          <div class="delivery-score">
            <p class="delivery-score-number">{{ratings.delivery_score}}</p>
            <p class="delivery-score-text">配送评分</p>
          </div>
        </div>
      </div>
      <!-- 所有评分结束 -->

      <Split></Split>
    
      <!-- 主要的导航开始 -->
      <div class="rating-nav" v-if="ratings.tab">
        <span class="all-rating" :class="{active:type==1}" v-on:click="onChangeType(1)">{{ratings.tab[0].comment_score_title}}</span>
        <span class="img-rating" :class="{active:type==2}" v-on:click="onChangeType(2)">{{ratings.tab[1].comment_score_title}}</span>
        <span class="wrap-score" :class="{active:type==3}" v-on:click="onChangeType(3)">
          <img class="img-black" v-if="type==3" src="./img/icon_sub_tab_dp_highlighted@2x.png" alt="">
          <img class="img-yellow" v-else src="./img/icon_sub_tab_dp_normal@2x.png" alt="">
          <span class="score">{{ratings.tab[2].comment_score_title}}</span>
        </span>
      </div>
      <!-- 主要的导航结束 -->

      <!-- 次要的导航开始 -->
      <div class="labels-view" >
        <ul>
          <li 
            v-for="(label,index) in ratings.labels" 
            :key="index" 
            :class="{hide: label.star}"
            >
            {{label.content}}&nbsp;{{label.label_count}}
          </li>
        </ul>
      </div>
      <!-- 次要的导航结束 -->

      <!-- 评论列表开始 -->
      <div class="rating-content" >
        <div class="user" v-for="(item,index) in comments" :key="index">
          <div class="left_user_icon">
              <img class="user_icon" :src="item.user_pic_url" v-if="item.user_pic_url" alt="">
              <img class="user_icon" src="./img/anonymity.png" v-else alt="">
          </div>
          <div class="right">
            <div class="nameAndTime">
              <span class="user_name">{{item.user_name}}</span>
              <span class="comment_time">{{formatData(item.comment_time)}}</span>
              <p class="wrap-star">
                <span>评分</span>
                <Star :score='item.order_comment_score'></Star>
              </p>
            </div>
            <p class="comment_content">{{item.comment}}</p>
            <div class="wrap-pic" v-if="item.comment_pics.length>=1">
              <div class="new-wrap-pic" v-for="(pic,index) in item.comment_pics" :key="index">
                <img class="comment-pic" :src="pic.url" alt="">
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 评论列表结束 -->

      <!-- 点评开始 -->
      <div class="score-dp">

      </div>
      <!-- 点评结束 -->
    </div>
    
  </div>
</template>

<script>
import Split from '../../components/split/Split';
import Star from '../../components/star/Star';
import Bscroll from "better-scroll"

export default {
  name: 'rating',
  data(){
    return {
      ratings: {},
      type: 1,
      Bscroll: {},
    }
  },
  components: {
    Split,
    Star,
    Bscroll,
  },
  methods: {

    onChangeType(type){
      this.type = type;
    },

    initBscroll(){
      this.$nextTick(() => {
        if(this.Bscroll){
          this.Bscroll = new Bscroll(this.$refs.rating, {click: true})
        }
      })
    },

    formatData(time){
      if(time > 0){
        var date = new Date();  
        date.setTime(time * 1000);  
        var y = date.getFullYear();      
        var m = date.getMonth() + 1;      
        m = m < 10 ? ('0' + m) : m;      
        var d = date.getDate();      
        d = d < 10 ? ('0' + d) : d;      
        var h = date.getHours();    
        h = h < 10 ? ('0' + h) : h;    
        var minute = date.getMinutes();    
        var second = date.getSeconds();    
        minute = minute < 10 ? ('0' + minute) : minute;      
        second = second < 10 ? ('0' + second) : second;     
        // return `${y}-${m}-${d} ${h}:${minute}:${second}`;       
        return `${y}-${m}-${d}`;       
      }else{
        return "";
      }
    },

    fetchRating(){
      fetch('api/ratings')
        .then((response => {
          return response.json()
        }))
        .then(res => {
          console.log(res)
          this.ratings = res.data;
        })
        .catch((err => {
          console.log('出错了' + err)
        }))
    }
  },
  computed: {
    comments(){
      if(this.type == 1){
        return this.ratings.comments
      }else if(this.type == 2){
        return this.ratings.comments.filter((item) => {
          if(item.comment_pics.length >= 1){
            return item
          }
        })
      }
    }
  },

  created(){
    this.fetchRating();
    this.initBscroll();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.rating{
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  color: #424242;
  overflow: hidden;
}
.overview{
  display: flex;
  padding: 10px;
}
.overview-left{
  flex: 1 1 auto;
  display: flex;
  align-items: center;
}
.comment-score{
  margin-right: 20px;
}
.comment-score-number{
  font-size: 20px;
  color: rgb(255, 166, 1);
  text-align: center;
}
.comment-score-text{
  margin-top: 5px;
  font-size: 14px;
  text-align: center;
}
.other-score{
  display: inline-block;
}
.quality-score,
.pack-score{
  display: flex;
  justify-content: center;
  margin: 5px 0;
}
.quality-score-text,
.pack-score-text{
  font-size: 12px;
  margin-right: 10px;
  line-height: 17px;
}
.overview-right{
  flex: 0 0 auto;
  display: flex;
  align-items: center;
}
.delivery-score{
  padding-left: 10px;
  border-left: 2px solid #aaa;
}
.delivery-score-number{
  font-size: 16px;
  color: #666;
  text-align: center;
}
.delivery-score-text{
  margin-top: 5px;
  font-size: 14px;
  text-align: center;
}

.rating-nav{
  display: flex;
  margin: 10px 10px 5px 10px;
  border-radius: 5px;
  border: 1px solid rgb(255, 166, 1);
}
.all-rating,
.img-rating,
.wrap-score{
  flex: 1;
  padding: 2px 0;
  text-align: center;
  font-size: 14px;
  color:  rgb(255, 166, 1);
}
.img-rating{
  border-left: 1px solid rgb(255, 166, 1);
  border-right: 1px solid rgb(255, 166, 1);
}
.active{
  background-color: rgb(255, 166, 1);
  color: #FFF;
}

.img-black,
.img-yellow{
  height: 14px;
  vertical-align: -2px;
}
.labels-view ul{
  display: flex;
  flex-wrap: wrap;
  padding: 0 5px;
}
.labels-view ul li{
  flex: 0 0 auto;
  padding: 2px 8px;
  margin: 2px 2px;
  border-radius: 2px;
  background: #eee;
}

.rating-content{
    margin: 0 5px 50px 10px;
    padding-bottom: 15px;
}
.user{
    display: flex;
    padding-top: 10px;
}
.left_user_icon{
    flex: 0 0 20px;
}
.user_icon{
    width: 25px;
    height: 25px;
    border-radius: 50%;
    margin-right: 5px;
}
.right{
    flex: 1 1 auto;
}
.user_name{
    font-size: 14px;
}
.comment_time{
    font-size: 12px;
    float: right;
}
.wrap-star>span{
  margin-right: 5px;
  vertical-align: 3px;
}
.comment_content{
    padding-top: 3px;
    font-size: 12px;
    line-height: 1.2;
}
.comment-pic{
  margin: 2px;
  max-width: 100px;
  height: 100px;
}



</style>
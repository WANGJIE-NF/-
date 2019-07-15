<template>
  <div class="header">
    <div class="header-background" :style="headPicUrl">
      <!-- 顶部通栏开始 -->
      <div class="top">
        <span class="back-ico icon-arrow_lift"></span>
        <form >
          <span class="search-ico"></span>
          <input type="text" placeholder="搜索店内商品">
        </form>
        <span class="spelling-ico">拼单</span>
        <div class="more-ico">
          <span class="s-radius"></span>
          <span class="s-radius"></span>
          <span class="s-radius"></span>
        </div>
      </div>
      <!-- 顶部通栏结束 -->

      <!-- 店铺开始 -->
      <div class="middle">
        <div class='logo-ico' :style="picUrl"></div>
        <div class="name">{{poiInfo.name}}</div>
        <div class='collect'>
          <img src="./img/star.png" alt="" srcset="">
          <span>收藏</span>
        </div>
      </div>
      <!-- 店铺结束 -->

      <!-- 公告 -->
      <div class="bulletin" v-if="poiInfo.discounts2">
        <span class="bulletin-discount-ico" :style="iconUrl"></span>
        <span class="bulletin-discount-text">{{poiInfo.discounts2[0].info}}</span>
        <span class="bulletin-number-text">共{{poiInfo.discounts2.length}}个活动</span>
        <span class="icon-keyboard_arrow_right" v-on:click="onShowBulletin"></span>
      </div>
      <!-- 公告结束 -->
    </div>
    <!-- 店铺活动开始 -->
    <div class="showBulletin" v-if="bulletin">
        <div class="mask"></div>
        <div class="bulletin-background" :style="poiBackPicUrl">
          <img class="logo-img" :src="poiInfo.pic_url" alt="" srcset="">
          <p class="bulletin-name">{{poiInfo.name}}</p>
          <Star :score='poiInfo.wm_poi_score'></Star>
          <p class="delivery">
            <span>{{poiInfo.shipping_fee_tip}}</span>
            <span class="separator">|</span>
            <span>{{poiInfo.min_price_tip}}</span>
            <span class="separator">|</span>
            <span>{{poiInfo.delivery_time_tip}}</span>
          </p>
          <p class="deliveryTime">配送时间：{{poiInfo.shipping_time}}</p>
          <hr/>
          <div class="discount"  v-for="(discount,index) in poiInfo.discounts2" :key="index">
            <img class="discount-img" :src="discount.icon_url" alt="">
            <span class="discount-text">{{discount.info}}</span>
          </div>
        </div>
        <div class="icon-close" v-on:click="onShowBulletin"></div>
      </div>
      <!-- 店铺活动结束 -->
  </div>
</template>

<script>
import Star from '../../components/star/Star'
export default {
  // name: 'header',
  data(){
    return {
      bulletin: false,
    }
  },
  components: {
    Star
  },
  props: {
    poiInfo: {
      type: Object,
      default(){
        return {}
      }
    }
  },
  methods: {
    onShowBulletin(){
      this.bulletin = !this.bulletin;
    }
  },
  computed: {
    headPicUrl(){
      return `background-image:url(${this.poiInfo.head_pic_url})`
    },
    picUrl(){
      return `background-image:url(${this.poiInfo.pic_url})`
    },
    iconUrl(){
      return `background-image:url(${this.poiInfo.discounts2[0].icon_url})`
    },
    poiBackPicUrl(){
      return `background-image:url(${this.poiInfo.poi_back_pic_url})`
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url("../../common/css/icon.css");

.header{
  width: 100%;
  height: 130px;
}

/* 顶部通栏开始  */
.header-background{
  width: 100%;
  height: 110px;
  padding-top: 20px;
  background-size: 100% 130px;
}
.top{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.back-ico{
  flex-shrink: 0;
  margin-left: 5px;
  color: #fff;
}
form{
  flex-grow: 1;
  position: relative;
  margin: 0 20px;
  height:20px;
}
.search-ico{
  position: absolute;
  left: 3px;
  top: 3px;
  width: 15px;
  height: 15px;
  background-image: url('./img/search.png');
  background-size: 100% 100%;
}
input{
  width: 100%;
  height: 18px;
  border-radius: 10px;
  border: none;
  text-indent: 20px;
  outline: none;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.spelling-ico{
  flex-shrink: 0;
  padding:4px;
  border: 1px solid #ccc;
  font-size: 12px;
  color: #fff;
}
.more-ico{
  flex-shrink: 0;
  display: flex;
  align-items: center;
  margin: 0 5px 0 10px;
}
.s-radius{
  display: inline-block;
  width: 4px;
  height: 4px;
  margin: 0 1px;
  border-radius: 3px;
  background-color: #fff;
}
/* 顶部通栏结束 */

/* 店铺开始 */
.middle{
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  height: 40px;
  padding: 8px;
}
.logo-ico{
  flex: 0 0 auto;
  width: 50px;
  height: 40px;
  border-radius: 4px;
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
.name{
  flex: 1 1 auto;
  margin-left: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 14px;
  color: #fff;
}
.collect{
  flex: 0 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
}
.collect img{
  width: 15px;
  height: 15px;
}
.collect span{
  margin-top: 3px;
  font-size: 12px;
  color: #fff;
}
/* 店铺结束 */


/* 公告开始 */
.bulletin{
  display: flex;
  /* justify-content: space-between; */
  align-items: center;
  color: #fff;
  padding: 5px;
}
.bulletin-discount-ico{
  flex: 0 0 auto;
  width: 20px;
  height: 20px;
  background-size: 100%;
} 
.bulletin-discount-text{
  flex: 1 1 auto;
  margin: 0 5px;
  white-space: nowrap; 
  overflow: hidden;      
  text-overflow: ellipsis;
  font-size: 12px;
}
.bulletin-number-text{
  flex: 0 0 auto;
  margin: 0 5px;
  font-size: 12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.icon-keyboard_arrow_right{
  flex: 0 0 20px;
}
/* 公告结束 */

/* 店铺活动开始 */
.showBulletin{
  position: fixed;
  left: 0;
  top: 0;
  width: 100vW;
  height: 100vH;
  z-index: 100;
}
.mask{
  width: 100%;
  height: 100%;
  background-color: #999;
  opacity: 0.5;
}
.bulletin-background{
  position:absolute;
  left: 10%;
  top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  width: 80%;
  height: 80%;
  padding: 20px 10px;
  border-radius: 10px;
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
.logo-img{
  width: 50px;
  border-radius: 5px;
}
.bulletin-name{
  padding: 5px 0;
  font-size: 12px;
}
.delivery{
  padding: 5px 0;
  font-size: 12px;
}
.separator{
  margin: 0 5px;
}
.deliveryTime{
  padding: 5px 0;
  font-size: 12px;
}
hr{
  width: 90%;
  border :none;
  border-bottom: 1px solid black;
}
.discount{
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  max-width: 100%;
  text-align: center;
}
.discount-img{
  flex: 0 0 auto;
  width: 20px;
  height: 20px;
  border-radius: 2px;
  margin-right: 5px;
}
.discount-text{
  flex: 1 1 auto;
  font-size: 10px;
  line-height: 1.2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.icon-close{
  position: absolute;
  top: 80%;
  left: 50%;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 2px solid #777;
  font-size: 25px;
  margin-top: 25px;
  line-height: 30px;
  text-align: center;
  margin-left: -15px;

}
/* 店铺活动结束 */



</style>
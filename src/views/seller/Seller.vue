<template>
  <div class="seller" ref="seller_scroll">
    <div class="scroll">
        
      <Split></Split>

      <div class="wrap-address">
        <img src="./img/address.png" class="icon-left" alt="">
        <span class="text">{{seller.address}}</span>
        <img src="./img/phone.png" class="icon-phone" alt="">
      </div>
      <div class="wrap-scroll" ref="img_scroll" >
        <ul v-if="seller.poi_env" ref="img_scroll_scroll">
          <li v-for="(url,index) in seller.poi_env.thumbnails_url_list" :key="index" ref="img_scroll_item">
            <img class="scroll-img" :src="url" alt="">
          </li>
        </ul>
      </div>
      <div class="wrap-food-safety">
        <img src="./img/safety.png" class="icon-left" alt="">
        <span class="text">查看食品安全档案</span>
        <span class="icon-keyboard_arrow_right"></span>
      </div>

      <Split></Split>

      <div class="wrap-delivery-service">
        <img src="./img/delivery.png" class="icon-left" alt="">
        <span class="text">配送服务:&nbsp;{{seller.app_delivery_tip}}</span>
      </div>
      <div class="wrap-shipping-time">
        <img src="./img/time.png" class="icon-left" alt="">
        <span class="text">{{seller.shipping_time}}</span>
      </div>

      <Split></Split>

      <div class="wrap-store-service">
        <img src="./img/server.png" class="icon-left" alt="">
        <span class="text">商家服务</span>
        <div class="store-service-item" v-for="(item,index) in seller.poi_service" :key="index">
          <img :src="item.icon" class="icon-left" alt="">
          <span class="text">{{item.content}}</span>
        </div>
      </div>
      <div class="wrap-discounts" v-for="(item,index) in seller.discounts2" :key="index">
        <img :src="item.icon_url" class="icon-left" alt="">
        <span class="text">{{item.info}}</span>
      </div>

    </div>

  </div>
</template>

<script>
import Split from '../../components/split/Split';
import Bscroll from 'better-scroll';
import { setTimeout } from 'timers';

export default {
  name: 'seller',
  data() {
    return {
      seller: {},
      Bscroll: {},
      seller_scroll: {},
      img_scroll: {},
    }
  },
  components: {
    Split,
    Bscroll,
  },
 

  methods: {
    fetchSeller(){
      fetch('/api/seller')
        .then((resp) => {
          return resp.json();
        })
        .then((res) => {
          this.seller = res.data;
          this.initscroll();
        })
        .catch((err) => {
          console.log(err)
        })
    },

    initscroll(){
      this.$nextTick(() => {
        this.seller_scroll = new Bscroll(this.$refs.seller_scroll, {click: true})
        let len = this.seller.poi_env.thumbnails_url_list.length;
        if(len > 0){
          let imgW = this.$refs.img_scroll_item[0].offsetWidth;
          let scrollW = (imgW) * len; 
          this.$refs.img_scroll_scroll.style.width = scrollW + 'px';
          this.img_scroll = new Bscroll(this.$refs.img_scroll, {click: true, scrollX: true})
        }
      })
    },

  },

  created(){
    this.fetchSeller();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.seller{
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.wrap-address,
.wrap-food-safety,
.wrap-delivery-service,
.wrap-shipping-time,
.wrap-store-service,
.wrap-discounts{
  position: relative;
  padding: 5px 10px;
}
.icon-left{
  position: absolute;
  height: 14px;
  margin-top: 2px;
}
.text{
  display: inline-block;
  margin-left: 20px;
  font-size: 14px;
}
.icon-phone{
  height: 14px;
  float: right;
}
.store-service-item{
  display: inline-block;
  position: relative;
  margin-left: 20px;
}

.wrap-scroll{
  width: 100%;
  overflow: hidden;
}

.wrap-scroll ul li{
  display: inline-block;
  padding-left: 5px;
}
.scroll-img{
  width: 100px;
  height: 100px;
  object-fit:cover;
}
</style>
<template>
  <div class="foods">
    <div class="foods-wrap">
      <!-- 商品分类 -->
      <div class="foods-sort" ref="foodsSort">
        <ul>

          <!-- 专场 -->
          <li class='foods-sort-item foods-sort-hook' :class="{active:nowIndex==0}" v-on:click="onFoodsSortItem(0)">
            <img v-if="container.tag_icon" :src="container.tag_icon">
            <span>{{container.tag_name}}</span>
          </li>

          <li class="foods-sort-item foods-sort-hook" :class="{active:nowIndex==index+1}" v-on:click="onFoodsSortItem(index+1)" v-for='(food,index) in foods' :key="index" >
            <img v-if="food.icon" :src="food.icon">
            <span class="food-sort-name">{{food.name}}</span>
            <span  class="shop-cart-tip" v-if="computedCount(food.spus)">{{computedCount(food.spus)}}</span>
          </li>
        
        </ul>
      </div>

      <!-- 商品列表  -->
      <div class="foods-list" ref="foodsList">
        <ul>

          <!-- 专场 -->
          <li class="foods-list-item-special foods-list-hook" >
            <div class="special-wra" v-for="(item,index) in container.operation_source_list" :key="index">
              <img :src="item.pic_url" alt="">
            </div>
          </li>

          <li  class="foods-list-item foods-list-hook" v-for="(food,index) in foods" :key="index" > 
            <div class="sort-wra">
              <h3 class="food-name">
                <span class="food-name-icon"></span>
                <span>{{food.name}}</span>
                </h3>
              <div class="spus"  v-for="(spus,ind) in food.spus" :key="ind" v-on:click="onShowSpus(spus)">
                <img class="spus-pic" :src="spus.picture" alt="">
                <div class="spus-text">
                  <h2 class="spus-name">{{spus.name}}</h2>
                  <p class="spus-description" v-if="spus.description">{{spus.description}}</p>
                  <p class="saled-and-praise">
                    <span>{{spus.month_saled_content}}</span>
                    <span>{{spus.praise_content}}</span>
                  </p>
                  <img  class="label-picture" v-if="spus.product_label_picture" :src="spus.product_label_picture">
                  <p class="price">
                    <span class="color-red">￥{{spus.min_price}}</span>
                    <span>/{{spus.unit}}</span>
                  </p>
                </div>
                <div class="cart-control-wrap">
                  <CartControl :spus="spus"></CartControl>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <!-- 购物车 -->
    <ShopCart :poiInfo="poiInfo" :foods='foods' ></ShopCart>

    <!-- 商品详情 -->
    <PrdductDetail :spus="spus" ref="spus"></PrdductDetail>
  </div>
</template>

<script>
import Bscroll from "better-scroll"
import ShopCart from "../../components/shopCart/ShopCart"
import CartControl from "../../components/cartControl/CartControl"
import PrdductDetail from "../../components/productDetail/ProductDetail"


export default {
  name: 'foods',
  data(){
    return {
      container : {}, // 专场数据
      foods : [],     // 商品数据
      poiInfo: {},    // 商家信息
      sortScroll: {}, // 分类列表滚动对象
      listScroll: {}, // 商品列表滚动对象
      eleSort: [],    // 分类列表
      eleHeight: [],  // 商品列表高度区间
      listScrollY: 0, // 商品列表当前高度
      computeNowIndex: true, // 是否需要计算nowIndex
      nowIndex: 0,    
      wait: 300,      // 节流
      spus: {},
    }
  },
  components: {
    Bscroll,
    ShopCart,
    CartControl,
    PrdductDetail,
  },
  methods: {

    //初始化函数 获取分类列表和计算商品列表高度区间
    computeHeight(){
      this.eleHeight.push(0)
      this.eleSort = this.$refs.foodsSort.getElementsByClassName('foods-sort-hook')
      let eleList = this.$refs.foodsList.getElementsByClassName('foods-list-hook')
      for(let i = 0; i < eleList.length; i++){
        this.eleHeight.push(this.eleHeight[i] + eleList[i].clientHeight);
      }
    },

    // 初始化函数 设置滚动对象
    initScroll(){
      this.sortScroll = new Bscroll(this.$refs.foodsSort, {probeType: 3, click: true})
      this.listScroll = new Bscroll(this.$refs.foodsList, {probeType: 3, click: true})
    },
    
    // 根据下标与右侧对应
    onFoodsSortItem(index){
      this.computeNowIndex = false;
      this.nowIndex = index;
      let ele = this.$refs.foodsList.getElementsByClassName('foods-list-hook')[index]
      this.listScroll.scrollToElement(ele, 500);
      console.log(3)
    },

    // 根据下标与左侧对应
     currentIndex(){ 
      if(this.computeNowIndex){
        for(let i = 0; i < this.eleHeight.length; i++) {
          if(this.listScrollY >= this.eleHeight[i] && this.listScrollY < this.eleHeight[i+1]){
            this.nowIndex = i
          }
        }
        let ele = this.eleSort[this.nowIndex];
        this.sortScroll.scrollToElement(ele, 300, 0, -100)
      }
    },


    computedCount(spus){
      let number = spus.reduce((val, spu) => {
        if(spu.count > 0){
          return val += spu.count
        }else{
          return val 
        }
      }, 0) 
      return number;
    },
   
    onShowSpus(spus){
      console.log(spus.name)
      this.spus = spus;
      this.$refs.spus.onShowSpus();

    },

    fetchMenus(){
      fetch('api/goods')
        .then(resp => {
          return resp.json();
        })
        .then(res => {
          this.container = res.data.container_operation_source;
          this.foods = res.data.food_spu_tags;
          this.poiInfo = res.data.poi_info;
          // this.initShopCart();

          // DOM已经更新后执行
          this.$nextTick(() => {
            this.initScroll();
            this.computeHeight();
            this.monitorListScroll;
          })
        })
        .catch(err => {
          console.log('出错了' + err)
        })
    },

    // 节流
    throttle(handler,wait){
      let lastTime = 0;
      return function(e){
        let nowTmie = new Date().getTime();
        if(nowTmie - lastTime > wait){
          handler.apply(this,arguments);
          lastTime = nowTmie;
        }
      }
    },
   
   
  },
  computed: {
    
    // 监听商品列表当前高度
    monitorListScroll(){
      let currentInde = this.throttle(this.currentIndex, this.wait); 
      this.listScroll.on("scroll", (pos) => {
        this.listScrollY = Math.abs(Math.floor(pos.y))
        currentInde();
      })

      this.listScroll.on("scrollEnd", (pos) => {
        this.computeNowIndex = true;
        this.currentIndex();
      })
    },
    

  },

  created(){
    this.fetchMenus();
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url(../../common/css/icon.css);

/* 分类列表 */
.foods{
  width: 100%;
  height: 100%;
}

.foods-wrap{
  display: flex;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding-bottom: 51px;
}

.foods-sort{
  flex: 0 0 85px;
  background: #f1f2f6;
  overflow: hidden;
}

.foods-sort-item{
  position: relative;
  padding: 15px 10px 15px 5px;
}
.foods-sort-item img{
  width: 16px;
}
.food-sort-name{
  font-size: 14px;
  color: #333;
  vertical-align: 2px; 
}
.shop-cart-tip{
  position: absolute;
  top: 3px;
  right: 0;
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: red;
  font-size: 10px;
  color: #fff;
  text-align: center;
  line-height: 15px;
}

/* 商品列表 */
.foods-list{
  flex: 1;
  background-color: #fff;
  overflow: hidden;
}
.foods-list-item-special{
  width: 100%;
  padding-bottom: 10px;
}
.special-wra{
  width: 100%;
  box-sizing: border-box;
  padding: 10px 10px 0 10px;
}
.special-wra img{
  width: 100%;
  border-radius: 5px;
}

.foods-list-item{
  padding: 10px 0 0 10px;
  border-top: 1px solid #e4e4e4;
}

.food-name{
  font-size: 12px;
  font-weight: 600;
}
.food-name-icon{
  display: inline-block;
  width: 3px;
  height: 11px;
  margin-right: 3px;
  background-image: url(./img/btn_yellow_highlighted@2x.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
.spus{
  position: relative;
  display: flex;
  align-items: center;
  padding: 10px 5px 10px 0;  
}
.spus-pic{  
  flex: 0;
  width: 60px;
  margin-right: 10px;
}
.spus-text{
  flex: 1;
  width: 50px;
}
.spus-name{
  padding-bottom: 8px;
  font-size: 14px;
  font-weight: 600;
}
.spus-description{
  color: #666;
  font-size: 12px;
  padding-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.saled-and-praise{
  color: #666;
  padding-bottom: 4px;
}
.saled-and-praise span{
  color: #666;
  font-size: 12px;
  padding-right: 5px;
}
.label-picture{
  height: 18px;
  padding-bottom: 4px;
}
.price{
  font-size: 14px;
}
.cart-control-wrap{
  position: absolute;
  bottom: 10px;
  right: 5px;
}

.color-red{
  padding-right: 5px;
  color: red;
}
.active{
 background: #fff
}
</style>
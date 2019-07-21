<template>
    <div class="shop-cart">
        <transition name="fade">
            <div class="shop-cart-list" v-if="showCartList">
                <div class="top" v-if="poiInfo.discounts2">{{poiInfo.discounts2[0].info}}</div>
                <div class="header">
                    <img src="./img/ash_bin.png" alt="">
                    <span v-on:touchstart="onClearShopCartList">清空购物车</span>
                </div>
                <div class="content" ref="content">
                    <ul>
                        <li class="list-item"  v-for="(item,index) in shopCartList" :key="index">
                            <div class="left-name">
                                <p class="name">{{item.name}}</p>
                                <p v-if="item.unit " class="unit">{{item.unit}}</p>
                                <p v-else-if="item.description " class="description">{{item.description}}</p>
                            </div>  
                            <div class="center-price">￥{{item.min_price * item.count}}</div>
                            <div class="right-cart-control">
                                <CartControl :spus='item'></CartControl>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </transition>

        <div class="summary" v-on:touchstart="onShowShopCartList">
            <div class="left">
            <div class="logo-wrap" :class='{colorYellow:totalCount}'>
                <span class="icon-shopping_cart"></span>
                <div v-if="totalCount" class="number" >{{totalCount}}</div>
            </div>
             <div class="desc-wrap">
                <p class="price" v-if="totalCount">￥{{totalPrice}}</p>
                <p class="tip">另需{{poiInfo.shipping_fee_tip}}</p>
            </div>
            </div>

            <div class="right">
                <div v-if="!totalCount" class="payment">{{poiInfo.min_price_tip}}</div>
                <div v-else class="payment" :class='{colorYellow:totalCount}'>结算</div>
            </div>
        </div>

        <div class="mask" v-if="showCartList" v-on:touchstart="show_shop_cart_list=false"></div>
    </div>
</template>


<script>
import CartControl from '../cartControl/CartControl.vue'
import Bscroll from 'better-scroll'
import { setInterval, setTimeout } from 'timers';
export default {
    name: 'shop-cart',
    data(){
        return{
            show_shop_cart_list: false,
            listScroll: '',
        }
    },
    components: {
        CartControl,
        Bscroll,
    },
    props: {
        poiInfo: {
            type: Object,
            default(){
                return {};
            }
        },
        foods: {
            type: Array,
            default(){
                return []
            }
        }
    },
    methods: {
        onShowShopCartList(){
            if(this.shopCartList.length){
                this.show_shop_cart_list = !this.show_shop_cart_list;

            }
        },
        onClearShopCartList(){
            this.show_shop_cart_list = false;
            this.foods.forEach((food) => {
                food.spus.forEach((spu) => {
                    spu.count = 0;
                    delete spu.count; // 删除该属性目的是为了当再次添加到购物车时  CartControl组件中的 Vue.set(this.spu, 'count', 1)语句能刷新页面
                })
            })
        },
           
    },

    computed: {
        totalCount(){
            let totalCount = 0;
            this.foods.forEach((food) => {
                food.spus.forEach((spu) => {
                    if(spu.count){
                        totalCount += spu.count
                    }
                })
            })
            return totalCount;
        },

        totalPrice(){
            let totalPrice  = 0;
            this.foods.forEach((food) => {
                food.spus.forEach((spu) => {
                    if(spu.count){
                        totalPrice += spu.count *spu.min_price
                    }
                })
            })
            return totalPrice;
        },

        shopCartList(){
            let shopCartList = [];
            this.foods.forEach((food) => {
                let arr = food.spus.forEach((spu) => {
                    if(spu.count > 0){
                        shopCartList.push(spu)
                    }
                })
            })
            if(shopCartList.length == 0){
                this.show_shop_cart_list = false;
            }
            return shopCartList;
        },

        showCartList(){
            if(this.shopCartList.length && this.show_shop_cart_list){
                this.$nextTick(() => {
                    /**
                     * 如果listScroll 为false，则实例化Bscroll，否则使用refresh方法更新，但是会更新失败，
                     * 所以现在是每次显示购物车列表都重新实例化一个对象
                     */
                    // if(!this.listScroll){
                        this.listScroll = new Bscroll(this.$refs.content, {click: true})
                    // }else{
                    //     this.listScroll.refresh()
                    // }
                })
                return true;
            }else{
                return false;
            }
        }

    }
}
</script>

<style scoped>
@import url(../../common/css/icon.css);
.shop-cart{
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 51px;
    z-index: 100;
}

.fade-enter,
.fade-leave-to{
    transform:translateY(300px)
}

.shop-cart-list{
    position: fixed;
    bottom: 51px;
    left: 0;
    width: 100%;
    background-color: #fff;
    z-index: 100;
}
.top{
    padding: 5px;
    background-color: #ffbe76;
    font-size: 12px;
    text-align: center;
}
.header{
    padding: 5px;
    background-color: #dff9fb;
    text-align: right;
}
.header img{
    height: 14px;
    margin-right: 5px;
}
.header span{
    font-size: 12px;
    vertical-align: 3px;
}
.content{
    max-height: 250px;
    overflow: hidden;
}
.list-item{
    display: flex;
    align-items: center;
    padding: 10px;
}
.left-name{
    flex: 1 1 auto;
}
.left-name .name{
    font-size: 14px;
    padding-bottom: 5px;
}   
.left-name .unit,
.left-name .description{
    font-size: 12px;
    color: #999;
}
.center-price{
    flex: 0 0 auto;
    padding-right: 30px;
}
.right-cart-control{
    flex: 0 0 auto;
}
.summary{
    position: fixed;
    left: 0;
    bottom: 0;
    display: flex;
    width: 100%;
    height: 51px;
    background-color: #514f4f;
    z-index: 100;
}
.left{
    flex: 1 1 auto;
}
.logo-wrap{
    position: absolute;
    top: -10px;
    left: 10px;
    width: 50px; 
    height: 50px;
    border-radius: 50%;
    background-color: #807d7d;
    text-align: center;
}
.icon-shopping_cart{
    font-size: 30px;
    line-height: 50px;
}
.number{
    position: absolute;
    top: -2px;
    left: 30px;
    display: inline-block;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: red;
    font-size: 10px;
    color: #fff;
    text-align: center;
    line-height: 17px;
}

.desc-wrap{
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    margin-left: 70px;
}
.price{
    font-size: 16px;
    line-height: 1.4;
    color: #fff;
}
.tip{
    font-size: 12px;
    line-height: 1.4;
    color: #dfdfdf;
}
.right{
    flex: 0 0 100px;

}
.payment{
    width: 100%;
    height: 100%;
    font-size: 16px;
    font-weight: 600;
    color: #dfdfdf;
    line-height: 51px;
    text-align: center;
}
.colorYellow{
    background-color: #f1d32d;
    color: #424242;
}

.mask{
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: #888;
    opacity: 0.5;
    z-index: 99;
}
</style>

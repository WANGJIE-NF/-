<template>
    <transition name="fade">
        <div class="product-detail" v-if="show_spus"  ref="productDetail">
            <div class="new-product-detail">

                <!-- 商品信息开始 -->
                <div>
                    <div class="top-control">
                        <span class="icon-close" v-on:touchstart="onHideSpus"></span>
                        <img class='share' src="./img/share.png" alt="">
                        <img class='more' src="./img/more.png" alt="">
                    </div>
                    <div class="wrap-picture">
                        <img class="picture" :src="spus.picture" :alt="spus.name">
                    </div>
                    <div class="spus">
                        <p class="name">{{spus.name}}</p>
                        <p class="saled">{{spus.month_saled_content}}</p>
                        <p class="wrap-pri-uni">
                            <span class="price">￥{{spus.min_price}}</span>
                            <span class="unit">/{{spus.unit}}</span>
                        </p>
                    <div class="wrap-cartControl" >
                        <cartControl :spus="spus" v-if="spus.count&&spus.count!='undefined'"></cartControl>
                        <div class="buy" v-else v-on:touchstart="onAddFoodShopCart">选规格</div>
                    </div>
                    </div>
                </div>
                <!-- 商品信息结束 -->

                <Split></Split>

                <!-- 评价信息开始 -->
                <div class="rating">
                    <div class="rating-header" v-if="spus.rating">
                        <span class="title">{{spus.rating.title}}</span>
                        <span class="like_ratio_desc">( {{spus.rating.like_ratio_desc}}</span>
                        <span class="like_ratio">{{spus.rating.like_ratio}} )</span>
                        <span class="flo_right"> 
                            <span class="snd_title">{{spus.rating.snd_title}}</span>
                            <span class="icon-keyboard_arrow_right"></span>
                        </span>
                    </div>
                    <div class="rating-content" v-if="spus.rating">
                        <div class="user" v-for="(user,index) in spus.rating.comment_list" :key="index">
                            <div class="left_user_icon">
                                <img class="user_icon" :src="user.user_icon" v-if="user.user_icon" alt="">
                                <img class="user_icon" src="./img/anonymity.png" v-else alt="">
                            </div>
                            <div class="right">
                                <p class="nameAndTime">
                                    <span class="user_name">{{user.user_name}}</span>
                                    <span class="comment_time flo_right">{{user.comment_time}}</span>
                                </p>
                                <p class="comment_content">{{user.comment_content}}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 评价信息结束 -->
            
            </div>
        </div>
    </transition>
</template>

<script>
import Vue from "vue"
import Bscroll from 'better-scroll';
import CartControl from '../cartControl/CartControl.vue'
import Split from '../split/Split.vue'

export default {
    data(){
        return {
            show_spus: false,
            Bscroll: '',
        }
    },
    components: {
        CartControl,
        Vue,
        Split,
        Bscroll,
    },

    props: {
        spus: {
            type: Object,
            default(){
                return {}
            }
        },
    },
    methods: {
        onHideSpus(){
            this.show_spus = false;
        },
        onShowSpus(){
            this.show_spus = true;
            this.$nextTick(() => {
                this.Bscroll = new Bscroll(this.$refs.productDetail, {click: true})
               
            })
        },
        onAddFoodShopCart(){
            Vue.set(this.spus, 'count', 1)
        }
    },
    computed: {
        pus(){
            console.log(this.spus);
        }
    },
    
}
</script>

<style scoped>

.fade-enter,
.fade-leave-to{
    transform: translateX(400px)
}
.product-detail{
    position: fixed;
    top: 0;
    bottom: 51px;
    left: 0;
    width: 100%;
    background-color: white;
    color: #424242;
    overflow: hidden;
}
.top-control{
    padding-top: 20px;
    overflow: hidden;
}
.icon-close{
    float: left;
    padding: 2px;
    margin: 0 5px;
    border-radius: 50%;
    font-size: 16px;
    background-color: #777;
    color: #fff;
}
.share,
.more{
    float: right;
    width: 20px;
    margin: 0 5px;
}
.wrap-picture{
    width: 100%;
    height: 65vh;
    overflow: hidden;
}
.picture{
    width: 100%;
}
.spus{
    position: relative;
    padding: 0 10px;
}
.spus .name{
    padding-top: 5px;
    font-size: 14px;
    font-weight: 600px;
}
.spus .saled,
.unit{
   padding-top: 5px;
    font-size: 12px;
    color: #999;
}
.wrap-pri-uni{
    padding-top: 5px;
}
.price{
    margin-right: 5px;
    font-size: 14px;
    font-weight: 600;
    color: red;
}
.wrap-cartControl{
    position: absolute;
    right: 10px;
    bottom: 5px;
}
.buy{
    padding: 5px 10px;
    border-radius: 50px;
    background-color: #ffbe76;
}
.rating{
    padding-bottom: 15px;
}
.rating-header{
    padding: 5px;
}
.title{
    font-size: 14px;
    font-weight: 600;
    margin-right: 3px;
}
.like_ratio_desc{
    font-size: 12px;
    font-weight: 600;
    color: #424242;
    margin-right: 3px;
}
.like_ratio{
    font-size: 12px;
    color: red;
}
.flo_right{
    float: right;
}
.snd_title{
    margin-right: 5px;
    font-size: 12px;
    color: #999;
    vertical-align: 3px;
}
.icon-keyboard_arrow_right{
    color: #999;
}

.rating-content{
    margin: 0 5px 5px 10px;
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
}
.comment_content{
    padding-top: 3px;
    font-size: 12px;
    line-height: 1.2;
}
</style>

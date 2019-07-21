<template>
    <div class="cart-control">
        <transition name='fade'>
            <span v-if="spus.count" v-on:touchstart.stop='onReduceFoodShopCart' class="icon-remove_circle_outline"></span>
        </transition>
        <span v-if="spus.count" class="number">{{spus.count}}</span>
        <span v-else class="number"></span>
        <span v-on:touchstart.stop='onAddFoodShopCart' class="icon-add_circle" ></span>
    </div>
</template>

<script>
import Vue from "vue"

export default {
    name: 'cart-control',
    props: {
        spus: {
            type: Object,
            default(){
                return {};
            }
        },

    },
    methods: {
        onReduceFoodShopCart(){
            if(this.spus.count > 0){
                this.spus.count--
            }
        },
        onAddFoodShopCart(){
            if(!this.spus.count){
                Vue.set(this.spus, 'count', 1)
            }else{
                this.spus.count++
            }
        },
    }

}
</script scoed>

<style>
.cart-control{
  display: flex;
  justify-content: flex-end;
  width: 90px;
} 
.number{
  display: inline-block;
  width: 20px;
  font-size: 16px;
  line-height: 30px;
  text-align: center;
}
.icon-remove_circle_outline{
  font-size: 30px;
  color: #b4b4b4;
} 
.icon-add_circle{
  position: relative;
  font-size: 30px;
  color: #f1d32d;
}
.icon-add_circle::after{
  position: absolute;
  top: 5px;
  left: 5px;
  content: '';
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: black;
  z-index: -1;
}
.fade-enter-active,
.fade-leave-active{
    transition: all 0.2s linear
}
.fade-enter{
    transform: translateX(10px);
}
.fade-leave-to{
    transform: translateX(50px);
}
</style>

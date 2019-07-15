<template>
    <transition name="fade">
        <div class="product-detail" v-if="spus.name">
            <div class="top-control">

            </div>
            <div class="img">
                <img src="" alt="">
            </div>
            <div class="spus">
                <p class="name">{{spus.name}}</p>
                <p class="saled">{{spus.month_saled_content}}</p>
                <p class="price">{{spus.min_price}}</p>
                <span class="unit">{{spus.unit}}</span>
            </div>
            <div class="rating">

            </div>
        </div>
    </transition>
</template>

<script>
export default {
    data(){
        return {}
    },

    props: {
        spus: {
            type: Object,
            default(){
                return {}
            }
        },
    }
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
    background-color: aquamarine;
    z-index: 1;
}


</style>

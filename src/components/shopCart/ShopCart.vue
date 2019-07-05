<template>
    <div class="shop-cart">
        <div class="left">
            <div class="logo-wrap">
                <span class="icon-shopping_cart"></span>
            </div>
            <div class="desc-wrap">
                <p class="tip">另需配送费用</p>
            </div>
             <!-- <div class="desc-wrap">
                 <div class="price"></div>
                <p class="tip">另需配送费用$</p>
            </div> -->
        </div>

        <div class="right">
            <span >0元起送</span>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
@import url(../../common/css/icon.css);
.shop-cart{
    position: fixed;
    left: 0;
    bottom: 0;
    display: flex;
    width: 100%;
    height: 51px;
    background-color: #514f4f;
}
.left{
    flex: 1 1 auto;
}
.logo-wrap{
    position: absolute;
    top: -20px;
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
.right{
    flex: 0 0 100px;
    font-size: 14px;
    font-weight: 600;
    color: #dfdfdf;
    line-height: 51px;
    text-align: center;
}
.desc-wrap{
    margin-left: 70px;
}
.tip{
    font-size: 12px;
    color: #dfdfdf;
    line-height: 51px;
}

</style>

<template>
  <div class="foods">
    <!-- 商品分类 -->
    <div class="foods-sort">
      <ul>

        <!-- 专场 -->
        <li class='foods-sort-item'>
          <img v-if="container.tag_icon" :src="container.tag_icon" >
          <span>{{container.tag_name}}</span>
        </li>

        <li class="foods-sort-item" v-for='(food,index) in foods' :key="index">
          <img v-if="food.icon" :src="food.icon">
          <span>{{food.name}}</span>
        </li>

      </ul>
    </div>
    <!-- 商品列表  -->
    <div class="foods-list">
      <ul>

        <!-- 专场 -->
        <li class="foods-list-item-special ">
          <div class="special-wra" v-for="(item,index) in container.operation_source_list" :key="index">
            <img :src="item.pic_url" alt="">
          </div>
        </li>

        <li  class="foods-list-item" v-for="(food,index) in foods" :key="index"> 
          <div class="sort-wra">
            <h3 class="food-name">
              <span class="food-name-icon"></span>
              <span>{{food.name}}</span>
              </h3>
            <div class="spus" v-for="(spus,ind) in food.spus" :key="ind">
              <img class="spus-pic" :src="spus.picture" alt="">
              <div class="spus-text">
                <h2 class="spus-name">{{spus.name}}</h2>
                <p class="spus-description" v-if="spus.description">{{spus.description}}</p>
                <p class="saled-and-praise">
                  <span>{{spus.month_saled_content}}</span>
                  <span>{{spus.praise_content}}</span>
                </p>
                <img v-if="spus.product_label_picture" class="label-picture" :src="spus.product_label_picture" ></img>
                <p class="price">
                  <span class="color-red">￥{{spus.min_price}}</span>
                  <span>/{{spus.unit}}</span>
                </p>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Bscroll from "better-scroll"

export default {
  name: 'foods',
  data(){
    return {
      container : {},
      foods : []
    }
  },
  components: {
    Bscroll
  },
  methods: {
    initScroll(){
      let foods_sort = document.getElementsByClassName('foods-sort')[0]
      let foods_list = document.getElementsByClassName('foods-list')[0]
      new Bscroll(foods_sort)
      new Bscroll(foods_list)
    },
    fetchMenus(){
      fetch('api/goods')
        .then(resp => {
          return resp.json();
        })
        .then(res => {
          this.container = res.data.container_operation_source;
          this.foods = res.data.food_spu_tags;
          this.initScroll();
        })
        .catch(err => {
          console.log('出错了' + err)
        })
    }
  },
  computed: {
   
  },
  created(){
    this.fetchMenus();
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* 分类列表 */
.foods{
  position: absolute;
  top: 171px;
  bottom: 51px;
  display: flex;
  width: 100%;
  overflow: hidden;
}
.foods-sort{
  flex: 0 0 85px;
  background: #f4f4f4;
}

.foods-sort-item{
  padding: 15px 0 15px 5px;
  border-bottom: 1px solid #e4e4e4;
}
.foods-sort-item img{
  width: 16px;
}
.foods-sort-item span{
  font-size: 14px;
  color: #333;
  vertical-align: 2px; 
}

/* 商品列表 */
.foods-list{
  flex: 1;
}
.foods-list-item-special{
  width: 100%;
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
  padding: 10px 0 0 5px;
  margin-top: 20px;
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
.color-red{
  padding-right: 5px;
  color: red;
}
</style>
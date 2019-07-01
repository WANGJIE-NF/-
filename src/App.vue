<template>
  <div id="app">

    <!-- 头部 -->
    <app-header :poiInfo='goods.poi_info'></app-header>

    <!-- 导航 -->
    <Nav></Nav>

    <!-- 内容 -->
    <Contemt></Contemt>

  </div>
</template>

<script>
import Header from './views/header/Header';
import Nav from './views/nav/Nav';
import Contemt from './views/contemt/Contemt';

  export default {
    name: 'app',
    data() {
      return {
        goods: {},
      };
    },
    components: {
      "app-header": Header,
      Nav,
      Contemt
    },
    methods: {
      async fetchGoods(){
        fetch('/api/goods')
          .then(resp => {
            return resp.json();
          })
          .then(res => {
            this.goods = res.data;
          })
          .catch(err => {
            console.log('出错了' + err)
          })
      }
    },
    created(){
      this.fetchGoods();
    }
  }
</script>

<style>

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

<template>
  <div id="app">

    <!-- 头部 -->
    <app-header :poiInfo='poiInfo'></app-header>

    <!-- 导航 -->
    <Nav :comment_num="comment_num"></Nav>

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
        poiInfo: {},
        comment_num: 0,
      };
    },
    components: {
      "app-header": Header,
      Nav,
      Contemt
    },
    methods: {
      fetchPoiInfo(){
        fetch('/api/goods')
          .then(resp => {
            return resp.json();
          })
          .then(res => {
            this.poiInfo = res.data.poi_info;
          })
          .catch(err => {
            console.log('出错了' + err)
          })
      },
      fetchCommentNum(){
        fetch('/api/ratings')
          .then(resp => {
            return resp.json();
          })
          .then(res => {
            this.comment_num = res.data.comment_num;
          })
          .catch(err => {
            console.log('出错了' + err)
          })
      }
    },
    created(){
      this.fetchPoiInfo();
      this.fetchCommentNum();
    }
  }
</script>

<style>

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

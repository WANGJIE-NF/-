import Vue from 'vue'
import Router from 'vue-router'
import Goods from './views/goods/Goods.vue';
import Evaluate from './views/evaluate/Evaluate.vue';
import Seller from './views/seller/Seller.vue';

Vue.use(Router)

export default new Router({
  routes: [
    {path: "*", redirect: '/goods'},
    {path: '/goods', name: 'goodsLink', component: Goods},
    {path: '/evaluate', name: 'evaluateLink', component: Evaluate},
    {path: '/seller', name: 'sellerLink', component: Seller},
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // },
  ],
  mode: "history"
})

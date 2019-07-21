import Vue from 'vue'
import Router from 'vue-router'
import Foods from './views/foods/Foods.vue';
import Rating from './views/rating/Rating.vue';
import Seller from './views/seller/Seller.vue';

Vue.use(Router)

export default new Router({
  routes: [
    {path: "*", redirect: '/foods'},
    {path: '/foods', name: 'foodsLink', component: Foods},
    {path: '/rating', name: 'ratingLink', component: Rating},
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

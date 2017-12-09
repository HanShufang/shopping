import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      component: resolve => require(['../components/index.vue'], resolve),
      children: [
        {
          path: '/goods',
          component: resolve => require(['../components/goods/goods.vue'], resolve)
        },
        {
          path: '/seller',
          component: resolve => require(['../components/seller/seller.vue'], resolve)
        },
        {
          path: '/ratings',
          component: resolve => require(['../components/ratings/ratings.vue'], resolve)
        }
      ]
    }
  ]
});

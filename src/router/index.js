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
      name: 'index',
      path: '/index',
      component: resolve => require(['components/index.vue'], resolve)
    },
    {
      name: 'order',
      path: '/order',
      component: resolve => require(['components/order.vue'], resolve)
    },
    {
      name: 'addressList',
      path: '/addressList',
      component: resolve => require(['components/address/addressList.vue'], resolve)
    },
    {
      name: 'address',
      path: '/address',
      component: resolve => require(['components/address/address.vue'], resolve)
    }
  ]
});

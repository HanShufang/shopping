// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import './library/axiosConfig';
import localStorageHelper from './library/localStorageHelper';
import './common/stylus/index.styl';

Vue.config.productionTip = false;

Vue.prototype.$ajax = axios;
Vue.prototype.$localStorage = localStorageHelper;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});

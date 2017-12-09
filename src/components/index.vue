<template>
  <div>
    <v-header></v-header>

    <div>
      <tab :line-width=2 active-color='#fc378c' v-model="index">
        <tab-item class="vux-center" :selected="demo2 === item" v-for="(item, index) in list2" @click="demo2 = item"
                  :key="index">{{item}}
        </tab-item>
      </tab>
      <swiper v-model="index" height="100px" :show-dots="false">
        <swiper-item v-for="(item, index) in list2" :key="index">
          <div class="tab-swiper vux-center">{{item}} Container</div>
        </swiper-item>
      </swiper>
    </div>
  </div>
</template>
<script>
  import header from './header/header.vue';
  import {Tab, TabItem, Swiper, SwiperItem} from 'vux';

  const list = () => ['精选', '美食', '电影', '酒店', '外卖'];
  export default {
    components: {
      'v-header': header,
      Tab,
      TabItem,
      Swiper,
      SwiperItem
    },
    data () {
      return {
        demo2: '美食',
        index: 0,
        list2: list()
      };
    },
    methods: {
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
</style>
<style lang="less" scoped>
  @import '~vux/src/styles/1px.less';
  @import '~vux/src/styles/center.less';
  .box {
    padding: 15px;
  }
  .active-6-1 {
    color: rgb(252, 55, 140) !important;
    border-color: rgb(252, 55, 140) !important;
  }
  .active-6-2 {
    color: #04be02 !important;
    border-color: #04be02 !important;
  }
  .active-6-3 {
    color: rgb(55, 174, 252) !important;
    border-color: rgb(55, 174, 252) !important;
  }
  .tab-swiper {
    background-color: #fff;
    height: 100px;
  }
</style>



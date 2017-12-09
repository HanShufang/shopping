<template>
  <div>
    <v-header></v-header>

    <div>
      <tab :line-width=2 active-color='#fc378c' v-model="index">
        <tab-item class="vux-center" :selected="demo2 === item" v-for="(item, index) in list2" @click="demo2 = item"
                  :key="index">{{item}}
        </tab-item>
      </tab>
      <swiper ref="contentswiper" v-model="index" :show-dots="false">
        <swiper-item :key="0">
          <div class="tab-swiper vux-center">
            <goods></goods>
          </div>
        </swiper-item>
        <swiper-item :key="1">
          <div class="tab-swiper vux-center">qqq
          </div>
        </swiper-item>
        <swiper-item :key="2">
          <div class="tab-swiper vux-center">mm
          </div>
        </swiper-item>
      </swiper>
    </div>
  </div>
</template>
<script>
  import header from './header/header.vue';
  import goods from './goods/goods.vue';
  import {Tab, TabItem, Swiper, SwiperItem} from 'vux';

  export default {
    components: {
      'v-header': header,
      'goods': goods,
      Tab,
      TabItem,
      Swiper,
      SwiperItem
    },
    data () {
      return {
        demo2: '美食',
        index: 0,
        list2: ['商品', '评价', '商家'],
        goods: []
      };
    },
    mounted () {
      this.queryGoods();
    },
    methods: {
      queryGoods () {
        this.$ajax.get('/api/goods.json')
          .then((res) => {
            this.goods = res;
            this.$nextTick(function () {
              this.$refs.contentswiper.xheight = (window.screen.height - 174) + 'px';
            });
          });
      }
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
</style>



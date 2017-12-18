<template>
  <div class="addresslist" ref="addresslist">
    <div>
      <swipeout>
        <swipeout-item @on-close="handleEvents('on-close')" @on-open="handleEvents('on-open')" transition-mode="follow"
                       v-for="item in addressList">
          <div slot="right-menu">
            <swipeout-button @click.native="onButtonClick('fav',item)" type="primary">编辑</swipeout-button>
            <swipeout-button @click.native="onButtonClick('delete', item)" type="warn">删除</swipeout-button>
          </div>
          <div slot="content" class="addresslist-item border-1px">
            <div class="address-con"><h3>{{item.name}}</h3><span>{{item.phoneNum}}</span></div>
            <div class="address">{{item.address}}</div>
          </div>
        </swipeout-item>
      </swipeout>
    </div>
    <div class="bottomContent">
      <span @click="toEditAddress">添加新地址</span>
    </div>
  </div>
</template>
<script>
  import {Swipeout, SwipeoutItem, SwipeoutButton} from 'vux';

  export default {
    data () {
      return {
        addressList: []
      };
    },
    components: {
      Swipeout,
      SwipeoutItem,
      SwipeoutButton
    },
    mounted () {
      this.$ajax.get('/api/address.json').then((res) => {
        this.addressList = res.data.content;
      });
    },
    methods: {
      onButtonClick (type, item) {
        if (type === 'fav') {
          this.$router.push({name: 'address', params: {'addressInfo': item}});
        } else {
          alert('on button click ' + type);
        }
      },
      handleEvents (type) {
        console.log('event: ', type);
      },
      toEditAddress () {
        this.$router.push({name: 'address'});
      }
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin"

  .addresslist
    .bottomContent
      position: fixed
      left: 0
      bottom: 0
      z-index: 50
      width: 100%
      height: 48px
      background: #FF6675
      span
        display: block
        color: #fff
        text-align: center
        width: 100%;
        height: 100%
        font-size: 18px
        line-height: 48px

  .addresslist-item
    padding: 10px 20px
    border-1px(rgba(7, 1, 27, 0.1))
    .address-con
      line-height: 24px
      h3
        font-size: 12px
        display: inline-block
        margin-right: 20px
      span
        font-size: 14px
    .address
      font-size: 12px
      line-height: 18px


</style>

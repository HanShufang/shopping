<template>
  <div class="order" ref="order">
    <div>
      <div class="topaddress" @click="toAddress">
        <div v-show="noAddress">请添加一个收货地址<i class="icon-keyboard_arrow_right"></i></div>
        <div v-show="!noAddress">
          <div class="address-con"><h3>{{addressVal.name}}</h3><span>{{addressVal.phoneNum}}</span></div>
          <div class="address">{{addressVal.address}}</div>
        </div>
      </div>
      <div class="split"></div>
      <div class="content border-1px">
        <div class="content-item border-1px"><span class="content-name">支付方式</span><span class="content-val">微信转账</span>
        </div>
        <div class="content-item content-item-no"><span class="content-name">邮费<i
          class="icon-question_mark"></i></span><span class="content-val content-val-important">请咨询商家</span></div>
      </div>
      <div class="split"></div>
      <div class="foodlist border-1px">
        <h1>您选择的商品</h1>
        <ul class="foodlist-ul">
          <li class="foodlist-item" v-for="item in foodList">
            <span class="foodlist-name">{{item.name}}</span><span class="foodlist-num">x{{item.count}}</span><span
            class="foodlist-money">￥{{item.price}}</span>
          </li>
        </ul>
        <div class="foodlist-total border-1px">商品总价<span class="foodlist-total-money">￥{{totalMoney}}</span></div>
      </div>
    </div>
    <div class="bottomContent">
      <span>确认下单</span>
    </div>
  </div>
</template>
<script>
  import BScroll from 'better-scroll';

  export default {
    data: function () {
      return {
        noAddress: false,
        foodList: [],
        addressVal: {}
      };
    },
    mounted () {
      this.$nextTick(() => {
        this.foodList = this.$route.params.foodData;
        this.initOrderScroll();
      });
      this.$ajax.get('/api/address.json')
        .then((res) => {
          if (res.data.content.length !== 0) {
            this.addressVal = res.data.content[0];
            console.log(this.addressVal);
          } else {
            this.noAddress = true;
          }
        });
    },
    computed: {
      totalMoney () {
        let tempPtice = 0;
        if (!this.foodList) {
          return;
        }
        this.foodList.forEach((item) => {
          tempPtice += item.price;
        });
        return tempPtice;
      }
    },
    methods: {
      initOrderScroll () {
        this.orderScroll = new BScroll(this.$refs.order, {
          click: true
        });
      },
      toAddress () {
        if (this.noAddress === false) {
          this.$router.push({name: 'addressList', params: {}});
        } else {
          this.$router.push({name: 'address'});
        }
      }
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../common/stylus/mixin"

  .order
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: calc(100% - 58px)
    .split
      width: 100%
      height: 16px
      background: #f3f5f7
    .topaddress
      background: url(../../static/images/address_bottom.png) repeat-x bottom
      padding: 20px
      font-size: 16px
      min-height: 30px
      line-height: 30px
      .icon-keyboard_arrow_right
        font-size: 30px
        float: right
        margin-right: -10px
      .address-con
        line-height: 24px
        h3
          font-size: 16px
          display: inline-block
          margin-right: 20px
        span
          font-size: 14px
      .address
        font-size: 12px
        line-height: 18px
    .content
      background: #fff
      padding: 0 20px
      border-1px(rgba(7, 1, 27, 0.1))
      .content-item
        font-size: 12px
        display: flex
        color: #999
        border-1px(rgba(7, 1, 27, 0.1))
        &.content-item-no
          border-none()
        .content-name
          padding: 15px 0
          flex: 1
          text-align: left
          .icon-question_mark
            margin-left: 5px
            color: #FF6675
            vertical-align: top
        .content-val
          padding: 15px 0
          flex: 1
          text-align: right
          &.content-val-important
            color: #FF6675
    .foodlist
      border-1px(rgba(7, 1, 27, 0.1))
      h1
        font-size: 14px
        height: 50px
        line-height: 46px
        border-1px(rgba(7, 1, 27, 0.1))
        padding: 0 20px
      .foodlist-ul
        padding: 0 20px
        .foodlist-item
          display: flex
          font-size: 14px
          padding: 10px 0
          .foodlist-name
            flex: 2
            color: #999
            line-height: 18px
          .foodlist-num
            flex: 1
            text-align: right
            color: #666
            padding: 0 10px
          .foodlist-money
            flex: 1
            text-align: right
            color: #FF6675
      .foodlist-total
        border-top: 1px solid rgba(7, 1, 27, 0.1)
        font-size: 16px
        color: #999
        padding: 20px
        .foodlist-total-money
          display: inline-block;
          color: #FF6675
          text-align: right
          font-size: 20px
          float: right
          font-weight: 700
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

</style>

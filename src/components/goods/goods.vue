<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li class="menu-item" :class="{'current':currentIndex === index}" v-for="(item, index) in goodData"
            @click="selectMenu(index, $event)">
          <span class="menu-text border-1px">{{item.name}}</span>
        </li>
      </ul>
    </div>
    <div class="food-wrapper" ref="foodWrapper">
      <ul>
        <li v-for="item in goodData" class="food-list food-list-hook">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li v-for="food in item.foods" class="food-item border-1px">
              <div class="icon">
                <img width="57" height="57" :src="food.icon"/>
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now-price">￥{{food.price}}</span><span class="old-price" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopcart :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shopcart>
  </div>
</template>
<script>
  import BScroll from 'better-scroll';
  import shopcart from 'components/shopcart/shopcart';

  export default {
    props: ['seller', 'goodData'],
    data () {
      return {
        listHeight: [],
        leftScrollY: 0
      };
    },
    components: {
      shopcart
    },
    mounted () {
      this.$nextTick(() => {
        this.initScroll();
        this.calculateHeight();
      });
    },
    computed: {
      currentIndex () {
        // 计算属性，判断当前得到的food的位置在哪两个区间范围内
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i];
          let height2 = this.listHeight[i + 1];
          if (!height2 || (this.leftScrollY >= height1 && this.leftScrollY < height2)) {
            return i;
          }
        }
        return 0;
      }
    },
    methods: {
      initScroll () {
        this.menuScroll = new BScroll(this.$refs.menuWrapper, {
          click: true
        }); // new BScroll()第一个参数是个dom,第二个参数是option,probeType属性告诉我们滚动的位置，相当于一个探针
        this.foodScroll = new BScroll(this.$refs.foodWrapper, {
          probeType: 3
        });
        this.foodScroll.on('scroll', (pos) => {
          // 这个函数的回调是一个位置
          this.leftScrollY = Math.abs(Math.round(pos.y));
        });
      },
      calculateHeight () {
        let foodList = this.$refs.foodWrapper.getElementsByClassName('food-list-hook');
        let tempheight = 0;
        this.listHeight.push(tempheight);
        for (let i = 0; i < foodList.length; i++) {
          tempheight += foodList[i].clientHeight;
          this.listHeight.push(tempheight);
        }
      },
      selectMenu (index, event) {
        if (!event._constructed) {
          return; // 自己写的点击事件才有_constructed属性，原生的没有
        }
        let foodList = this.$refs.foodWrapper.getElementsByClassName('food-list-hook');
        let el = foodList[index];
        this.foodScroll.scrollToElement(el, 300);
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/mixin"

  .goods
    width: 100%;
    display: flex
    overflow: hidden
    position: absolute;
    top: 0;
    left: 0;
    bottom: 46px;
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        line-height: 14px
        width: 56px
        padding: 0 12px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          color: rgb(240, 20, 20)
          font-weight: 700
          .menu-text
            border-none()
        .menu-text
          display: table-cell
          width: 56px
          vertical-align: middle
          font-size: 12px
          border-1px(rgba(7, 1, 27, 0.1))
    .food-wrapper
      flex: 1;
      background: #fff
      .food-list
        .title
          padding-left: 14px
          height: 26px
          line-height: 26px
          border-left: 2px solid #d9dde1
          font-size: 12px
          color: rgb(147, 153, 159)
          background: #f3f5f7
        .food-item
          display: flex
          margin: 18px
          padding-bottom: 18px
          border-1px(rgba(7, 1, 27, 0.1))
          &:last-child
            border-none()
            margin-bottom: 0
          .icon
            flex: 0 0 57px
            margin-right: 10px
          .content
            flex: 1
            .name
              font-size: 14px
              height: 14px
              line-height: 14px
              margin: 2px 0 8px 0
            .desc, .extra
              font-size: 10px
              color: rgb(147, 153, 159)
            .desc
              line-height: 12px
              margin-bottom: 8px
            .extra
              line-height: 10px
              .count
                margin-right: 12px
            .price
              font-weight: 700
              line-heigt: 24px
              .now-price
                margin-right: 8px
                font-size: 14px
                color: rgb(240, 20, 20)
              .old-price
                text-decoration: line-through
                font-size: 10px
                color: rgb(147, 153, 159)


</style>


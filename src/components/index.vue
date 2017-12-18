<template>
  <div>
    <div>
      <v-header :seller="seller"></v-header>
      <div class="goods-wrapper">
        <div class="goods">
          <div class="menu-wrapper" ref="menuWrapper">
            <ul>
              <li class="menu-item" :class="{'current':currentIndex === index}" v-for="(item, index) in goodData"
                  @click="selectMenu(index, $event)" ref="menuList">
                <span class="menu-text border-1px">{{item.name}}</span>
              </li>
            </ul>
          </div>
          <div class="food-wrapper" ref="foodWrapper">
            <ul>
              <li v-for="item in goodData" class="food-list" ref="foodList">
                <h1 class="title">{{item.name}}</h1>
                <ul>
                  <li @click="selectFood(food,$event)" v-for="food in item.foods" class="food-item border-1px">
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
                      <div class="cartcontrol-wrapper">
                        <cartcontrol @add="addFood" :food="food"></cartcontrol>
                      </div>
                    </div>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <shopcart ref="shopcart" :selectFoods="selectFoods" :delivery-price="seller.deliveryPrice"
                    :min-price="seller.minPrice"></shopcart>
        </div>
        <!-- 商品详情页 -->
        <food @add="addFood" :food="selectedFood" ref="food"></food>
      </div>
    </div>

  </div>
</template>
<script>
  import header from './header/header.vue';
  import BScroll from 'better-scroll';
  import shopcart from 'components/shopcart/shopcart';
  import cartcontrol from 'components/cartcontrol/cartcontrol';
  import food from 'components/food/food';

  export default {
    components: {
      'v-header': header,
      shopcart,
      cartcontrol,
      food
    },
    data () {
      return {
        goodData: [],
        seller: {},
        selectedFood: {},
        listHeight: [],
        leftScrollY: 0,
        scrollY: 0,
        food: '',
        tempFood: []
      };
    },
    mounted () {
      this.tempFood = JSON.parse(localStorage.getItem('choosefood'));
      console.log(this.tempFood, 2222);
      this.$ajax.get('/api/seller.json')
        .then((res) => {
          this.$nextTick(() => {
            this.seller = res.data.content;
          });
        });
      this.$ajax.get('/api/goods.json')
        .then((res) => {
          this.goodData = res.data.content;
          this.$nextTick(() => {
            this.initScroll();
            this.calculateHeight();
          });
        });
    },
    computed: {
      currentIndex () {
        // 计算属性，判断当前得到的food的位置在哪两个区间范围内
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i];
          let height2 = this.listHeight[i + 1];
          if (!height2 || (this.leftScrollY >= height1 && this.leftScrollY < height2)) {
            // this._followScroll(i);
            return i;
          }
        }
        return 0;
      },
      selectFoods () {
        let foods = [];
        /* if (localStorage.getItem('choosefood') !== '') {
           let tempFoods = [];
           foods = tempFoods.concat(this.tempFood);
         } else {*/
          this.goodData.forEach((good) => {
            good.foods.forEach((food) => {
              if (food.count) {
                foods.push(food);
              }
            });
          });
        //}
        return foods;
      }
    },
    methods: {
      initScroll () {
        this.menuScroll = new BScroll(this.$refs.menuWrapper, {
          click: true
        }); // new BScroll()第一个参数是个dom,第二个参数是option,probeType属性告诉我们滚动的位置，相当于一个探针
        this.foodScroll = new BScroll(this.$refs.foodWrapper, {
          probeType: 3,
          click: true
        });
        this.foodScroll.on('scroll', (pos) => {
          // 这个函数的回调是一个位置
          this.leftScrollY = Math.abs(Math.round(pos.y));
        });
      },
      calculateHeight () {
        let foodList = this.$refs.foodList;
        let tempheight = 0;
        this.listHeight.push(tempheight);
        for (let i = 0; i < foodList.length; i++) {
          tempheight += foodList[i].clientHeight;
          this.listHeight.push(tempheight);
        }
      },
      selectFood (food, event) {
        if (!event._constructed) {
          return;
        }
        this.selectedFood = food;
        this.$refs.food.showFood();
      },
      selectMenu (index, event) {
        if (!event._constructed) {
          return; // 自己写的点击事件才有_constructed属性，原生的没有
        }
        let foodList = this.$refs.foodList;
        let el = foodList[index];
        this.foodScroll.scrollToElement(el, 300);
      },
      addFood (target) {
        this._drop(target);
      },
      _drop (target) {
        // 优化体验，异步执行下落动画
        this.$nextTick(() => {
          this.$refs.shopcart.drop(target);
        });
      },
      _followScroll (index) {
        let menuList = this.$refs.menuList;
        let el = menuList[index];
        this.menuScroll.scrollToElement(el, 300, 0, -100);
      }
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../common/stylus/mixin"
  .goods-wrapper
    position: fixed;
    top: 130px;
    left: 0;
    width: 100%;
    height: calc(100% -(130px + 0px));
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
                margin-bottom: 8px
              .desc
                line-height: 12px
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
              .cartcontrol-wrapper
                position: absolute
                right: 0
                bottom: 12px


</style>



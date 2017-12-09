<template>
  <div class="header">
    <img src="static/images/topImg.jpg"/>
    <div class="header-con">
      <flexbox>
        <flexbox-item :span="4">
          <div class="header-img"><img src="static/images/headerImg.jpg" /></div>
        </flexbox-item>
        <flexbox-item>
          <div class="flex-demo">2/3</div>
        </flexbox-item>
      </flexbox>
    </div>
  </div>
</template>

<script>
  import {Flexbox, FlexboxItem} from 'vux';

  export default {
    components: {
      Flexbox,
      FlexboxItem
    },
    data () {
      return {
        info: ''
      };
    },
    mounted () {
      this.$ajax.get('/api/seller.json')
        .then((res) => {
          this.info = res;
        });
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .header
    width: 100%
    height: 130px
    position: relative
    img
      width: 100%
      height: 100%
    .header-con
      position: absolute
      height: calc(100% -(24px + 18px))
      width: calc(100% -(24px + 12px))
      top: 0
      left: 0
      padding: 24px 12px 18px 24px
  .header-img
    height: 88px
    width: 88px

</style>


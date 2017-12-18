<template>
  <div>
    <group label-width="5em" title="收货地址">
      <cell align-items="flex-start" title="姓名">
        <div>
         <input type="text" placeholder="请输入收货人姓名"/>
        </div>
      </cell>
      <cell align-items="flex-start" title="手机号">
        <div>
          <input type="text" maxlength="11" minlength="11" placeholder="请输入手机号码"/>
        </div>
      </cell>
      <cell align-items="flex-start" title="详细地址">
        <div>
          <input type="text" placeholder="请输入正确的收货地址"/>
        </div>
      </cell>
    </group>
  </div>
</template>
<script>
  import {Cell, Group, XInput} from 'vux';

  export default {
    data () {
      return {};
    },
    components: {
      Group,
      Cell,
      XInput
    },
    mounted () {
      console.log(this.$route.params.addressInfo);
    },
    methods: {
      change (val) {
        console.log('on change', val);
      },
      onBlur (val) {
        console.log('on blur', val);
      }
    }
  };
</script>

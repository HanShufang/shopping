<template>
  <div>
    <v-header :seller="seller"></v-header>
  </div>
</template>
<script>
  import header from './components/header/header.vue';
  export default {
    data: function () {
      return {
        tableData: []
      };
    },
    components: {
      'v-header': header
    },
    mounted () {
      this.queryAccountBtn();
    },
    methods: {
      queryAccountBtn () {
        this.$ajax.get('/api/goods.json')
          .then((res) => {
            this.tableData = res;
            console.log(this.tableData);
            console.log(res, '======_queryAccountParams====res');
          });
      }
    }
  };
</script>

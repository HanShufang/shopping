<template>
  <div></div>
</template>
<script>
  export default {
    data: function () {
      return {
        tableData: []
      }
    },
    mounted () {
      this.queryAccountBtn()
    },
    methods: {
      queryAccountBtn () {
        this.$ajax.get('http://localhost:8088/goods.json')
          .then((res) => {
            console.log(res, '======_queryAccountParams====res')
          })
      }
    }
  }
</script>

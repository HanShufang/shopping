<template>
  <div>111
    {{tableData}}
  </div>
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
        this.$ajax.get('/api/goods.json')
          .then((res) => {
            this.tableData = res
            console.log(this.tableData)
            console.log(res, '======_queryAccountParams====res')
          })
      }
    }
  }
</script>

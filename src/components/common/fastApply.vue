<template></template>
<script type="text/ecmascript-6">
  export default {
    created(){
      console.log(this.$route);
      window.location.href = this.$route.params.url;
    }
  }
</script>
<style></style>

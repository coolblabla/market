<template>
  <div class="clue">
    <p>{{clue}}</p>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props:['clue'],
    data(){
      return {

      }
    }
  }
</script>
<style scoped lang="stylus">
  .clue
    position absolute
    left 50%
    transform translate(-50% , -100%)
    top 50%
    padding 0 50px
    text-align center
    height 40px
    line-height 40px
    border-radius 10px
    background-color rgba(0,0,0,.6)
    p
      white-space nowrap
      font-size 24px
      color #ffffff
</style>

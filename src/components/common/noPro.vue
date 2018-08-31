<template>
  <div class="noPro">
    <i></i>
  </div>
</template>
<script type="text/ecmascript-6"></script>
<style scoped lang="stylus">
  @import "../../common/stylus/mixin.styl"
  .noPro
    position absolute
    top 50%
    left 50%
    bottom 0
    right 0
    height 180px
    transform translate(-50%,-50%)
    i
      display block
      height 180px
      width 344px
      margin auto
      $bg-image('./img/pic-empty')
      $bg-size(100%,100%)
</style>

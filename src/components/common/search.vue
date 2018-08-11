<template>
  <div class="searchWrap">
    <div class="flag" :class="{'backWidth':backW}">
      <slot></slot>
    </div>
    <div class="search">
      <i></i>
      <input :placeholder="place"/>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props:{
      backW:{
        type:Boolean,
        default(){
          return false;
        }
      },
      place:{
        default(){
          return '搜索'
        }
      }
    },
    data(){
      return {

      }
    }
  }
</script>
<style lang="stylus" scoped>
  @import "../../common/stylus/variable.styl"
  @import "../../common/stylus/mixin.styl"
.searchWrap
  display flex
  align-items center
  padding 14px 40px 14px 0
  background-color $color-blue
  .flag
    flex  0 0 180px
  .backWidth
    flex  0 0 120px
  .search
    position relative
    flex 1
    i
      position absolute
      top 50%
      margin-top -18px
      left 50%
      margin-left -48px
      width 36px
      height 36px
      $bg-size(100%,100%)
      $bg-image('./img/ic-search')
    input
      height 60px
      width 100%
      box-sizing border-box
      padding-left 50%
      border-radius 6px
</style>


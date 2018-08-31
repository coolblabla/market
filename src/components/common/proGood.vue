<template>
  <div class="proGood">
    <slot name="head">

    </slot>
    <div class="proGood_list">
      <slot name="main"></slot>
    </div>
  </div>
</template>
<script type="text/ecmascript-6"></script>
<style lang="stylus" >
  /*借贷精选*/
  .proGood
    margin 30px 0
    background-color #ffffff
    .head
      padding-left 40px
    .proGood_list
      height 224px
      .proGoodContainer
        position relative
        height @height
        .goodSlider
          width 100%
          box-sizing border-box
          padding 30px
          ul
            display flex
            justify-content space-between
            li
              width 153px
              height 152px
              a
                display block
                background-color rgb(247,247,247)
                width 100%
                height 100%
                margin 0 auto
                text-align center
                img
                  width 80px
                  height 80px
                  margin 16px 0

</style>

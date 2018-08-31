<template>
  <div class="hintWrap">
    <ul class="hint">
      <li class="title"><h4>{{attr.title}}</h4></li>
      <li class="content"><p id="infoVal">{{attr.content}}</p></li>
      <li class="btn">
        <slot></slot>
      </li>
    </ul>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props:{
      attr:{
        type :Object,
        default:function () {
          return {
            title:'提示',
            content:'成功!',
            confirmText:'返回',
            router: true,
            to:"/"
          }
        }
      },
      showBtn:{
        type:Boolean,
        default:true
      }
    },
    data() {
      return {
        copyValue:''
      }
    },
    methods:{
      operation(){
        this.$emit('operation')
      }
    }
  }
</script>
<style scoped lang="stylus">
  .hintWrap
    position absolute
    width 100%
    height 100%
    top 0
    left 0
    background-color rgba(199,199,199,.8)
    .hint
      position absolute
      width 500px
      height auto
      top 50%
      left 50%
      transform translateY(-50%)
      margin-left -250px
      z-index 999
      box-sizing border-box
      text-align center
      background-color #ffffff
      border-radius 10px
      .content
        display flex
        align-items center
        width 100%
        height:170px
        font-size 34px
        color #666666
        overflow hidden
        box-sizing border-box
        border-bottom 1px solid #DFDFDF
        border-top 1px solid #DFDFDF
        p
          width 100%
          white-space normal
          word-wrap break-word
          word-break normal
      .title,.btn
        height 65px
        line-height 65px
        font-size 34px
        color #FA0802
        h4
          height 100%
      .btn
        display flex
        button,a
          width 50%
          height 100%
          padding 0
          border none
          font-size 30px
          color #333333
          background-color transparent
</style>

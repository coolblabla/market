<template>
  <ul class="typeWrap">
    <li v-for="(item,index) in arr" :key="index">
      <div class="typeWrap_box">
        <div class="l_detail">
          <i><img :src="item.proIcon" /></i>
          <div class="typeT">
            <p class="typeT_title">
              <span class="typeT_title_name">{{item.proName}}</span>
              <span  class="typeT_title_num">{{item.loanNumber}}人已借款</span>
            </p>
            <p class="typeT_flag">{{item.productIntroduction}}</p>
          </div>
        </div>
        <div class="l_limit">
          <div class="limit">
            <p class="money"><span>{{item.proLimitMin}}</span>-<span>{{item.proLimitMax}}</span></p>
            <p class="hint">额度(元)</p>
          </div>
          <div class="rate">
            <p>{{item.proRateMin}}</p>
            <p class="hint">利率(%)</p>
          </div>
          <div class="apply">
            <router-link :to="{name:'applyPage',params:{name:item.name}}">申请</router-link>
          </div>
        </div>
      </div>
    </li>
  </ul>
</template>
<script type="text/ecmascript-6">
  export  default {
    props:{
      arr:{
        type:Array,
        default(){
          return [];
        }
      }
    },
    data(){
      return {}
    },
//    watch:{
//      '$route'(to,from){
//
//      }
//    }
  }
</script>
<style scoped lang="stylus">
  @import "../../common/stylus/variable.styl"
.typeWrap
  width 100%
  li
    margin-bottom 30px
    background-color #ffffff
    .typeWrap_box
      padding 34px 46px 0 46px
      .l_detail
        display flex
        align-items center
        padding-bottom 28px
        border-bottom  1px solid $color-bottom
        i
          flex 0 0 64px
          height 64px
          margin-right 45px
          img
            width 100%
            height 100%
        .typeT
          flex 1
          .typeT_title
            display flex
            justify-content space-between
            .typeT_title_name
              color $color-black
              font-size 28px
            .typeT_title_num
              color $color-h
              font-size $font-size-22
          .typeT_flag
            margin-top 18px
            font-size $font-size-24
            color $color-h
      .l_limit
        display flex
        align-items center
        justify-content space-between
        height 140px
        background-color transparent
        .limit,.rate
          text-align center
          color $color-red
          font-size $font-size-32
          .hint
            margin-top 20px
            color $color-h
            font-size $font-size-22
          background-color transparent
        .apply
          border 1px solid $color-blue
          border-radius 55px
          height 55px
          line-height 55px
          padding 0 40px
</style>

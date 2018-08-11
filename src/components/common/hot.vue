<template>
  <ul class="hotWrap">
    <li v-for="(item,index) in arr" :key="index">
        <router-link :to="{name:'applyPage'}">
       <i class="icon"><img :src="item.proIcon" /></i>
        <div class="detail">
          <h1>{{item.proName}}</h1>
          <div class="limit">
            <strong class="label">额度:</strong>
            <p><span>{{item.proLimitMin}}</span><span>~</span><span>{{item.proLimitMax}}</span><span>元</span></p>
          </div>
          <div class="material">
            <strong class="label">所需材料:</strong>
           <!-- <ul><li v-for="(val,n) in item.list" :key="n">{{val}}</li></ul>-->
            <ul>
              <li v-if="item.isCard">身份证</li>
              <li v-if="item.isCreditCard">一次还清</li>
              <li v-if="item.isCreditSesame">新上线</li>
            </ul>
          </div>
        </div>
        </router-link>
    </li>
  </ul>
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      arr: {
        type: Array,
        required: true
      }
    },
    data() {
       return {

       }
    },
    methods:{

    }
  }
</script>
<style scoped lang="stylus">
  @import "../../common/stylus/variable.styl"
  .hotWrap
    li
      border-bottom 1px solid rgb(238,238,238)
      a
        display flex
        align-items center
        .icon
          flex 0 0 90px
          margin-right 46px
          height 90px
          color red
          img
           width 100%
           height 100%
        .detail
          flex 1
          padding 34px 0 26px 0
          .label
            font-size 24px
            color rgb(153,153,153)
          h1
            margin-bottom 22px
            color rgb(51,51,51)
            font-size 30px
          .limit
            display flex
            align-items center
            line-height 50px
            span
             font-size 30px
             color rgb(255,56,59)
          .material
            display flex
            align-items center
            li
              display inline-block
              height 26px
              line-height 26px
              padding 10px
              font-size $font-size-20
              margin-left 14px
              border-radius 10px
              border 2px solid rgb(55,137,229)

</style>

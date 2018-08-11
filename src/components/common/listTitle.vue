<template>
  <div class="title">
    <div class="wrap">
      <h1>{{title}}</h1>
      <router-link v-show="more"  :to="{name:skip,params:routerparams}">更多</router-link>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props:{
      title:{
        type:String
      },
      skip:{
        type:String,
      },
      more:{
        type:Boolean,
        default(){
          return false
        }
      },
      routerparams:{
        default(){
          return {

          }
        }
      }
    },
    data(){
      return {
         attr:{}
      }
    },
    methods:{
    }
  }
</script>
<style scoped lang="stylus">
.title
  height 78px
  line-height 78px
  background-color #ffffff
  border-bottom 1px solid rgb(238,238,238)
  .wrap
    display flex
    justify-content space-between
    h1
      color rgb(255,57,60)
      font-size 30px
    a
      padding 0 40px
      font-size 24px
      color rgb(153,153,153)
</style>

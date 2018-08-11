<template>
  <div class="wrap">
    <div  :class="['back',{'caseBorder':styles}]">
      <div class="icon" v-if="isIcon" @click="goBack"><i  :class="{'caseIcon' :styles}"></i></div>
      <h4 :class="{'caseText' :styles}" :style="{color:fontStyle.color,letterSpacing:fontStyle.spacing}">{{title}}</h4>
      <router-link v-if="route.show" :to="route.to">{{route.text}}</router-link>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props:{
      title:{
        required:true,
        default :'标题'
      },
      fontStyle:{
        default() {
          return {
            color:'#ffffff',
            spacing:'0px'
          }
        }
      },
      styles:{       //账单详情
        default:false
      },
      isIcon:{
        default : true
      },
      route:{
        default(){
          return {
            show:false,
            to:'/',
            text:'喝喝'
          }
        }
      }
    },
    data() {
      return {
      }
    },
    methods:{
      goBack() {
        this.$emit('goback');
           window.history.length > 1?  history.go(-1) : this.$router.push('/')
      }
    }
  }
</script>
<style scoped lang="stylus">
  @import "../../common/stylus/mixin.styl"
  .wrap
    position: relative
    background-color rgb(55,137,229)
    width:100%
    /*padding-top: 20px*/
    z-index 99
    height: 88px
    .back
      display: flex
      align-items: center;
      -webkit-align-items: center;
      width:100%;
      height: 100%;
      /*border-bottom: 1px solid #EEEEEE;*/
      h4
        margin: auto
        font-size: 34px
      .caseText
        color: #ffffff
      .icon
        position absolute
        padding 20px
        width:38px
        height: 35px
        margin-left: 20px
        i
          display block
          width 100%
          height 100%
          $bg-image("./img/ic-back-white")
          background-size: 100% 100%
        .caseIcon
          $bg-image("./img/ic-back-white")
      a
        position absolute
        right 32px
        top 50%
        transform translateY(-50%)
        font-size 24px
        color #FFFFFF
    .caseBorder
      border-bottom: none
</style>


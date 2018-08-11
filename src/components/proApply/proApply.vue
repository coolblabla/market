<template>
  <div class="applyWrap">
    <back :title="head"></back>
    <div class="proInfo">
      <!--产品信息-->
      <div class="typeWrap_box">
        <div class="l_detail">
          <i><img :src="info.picUrl" /></i>
          <p class="client">{{info.name}}</p>
          <p class="l_number">{{info.loanN}}人已借款</p>
        </div>
        <div class="l_limit">
          <div class="limit">
            <p class="money">{{info.money}}</p>
            <p class="hint">日还款金额</p>
          </div>
          <div class="rate">
            <p>{{info.rate}}</p>
            <p class="hint">利率(%)</p>
          </div>
          <div class="total">
            <p>{{info.totalRate}}</p>
            <p class="hint">总利息</p>
          </div>
        </div>
      </div>
      <!--产品输入-->
      <div class="loanMoney">
        <div class="money">
          <div class="money_box">
            <label>借款金额<span>({{info.loanMin}}~{{info.loanMax}})</span></label>
            <div>
              <input type="number"  v-model="info.loanMoney">  <!--autofocus-->
              <dfn>元</dfn>
            </div>
          </div>
        </div>
        <div class="timeLimit">
          <div class="timeLimit_box">
            <label>借款期限<span>({{info.timeMin}}~{{info.timeMax}})</span></label>
            <select v-model="info.timeLimit">
              <option :value="item"   v-for="(item,index) in info.timeLimitList">{{item}}</option>
            </select>
          </div>

        </div>
      </div>
      <!--申请条件-->
      <div class="condition">
        <div class="condition_box">
          <h4 class="title">申请条件</h4>
          <ul class="condition_list">
            <li v-for="(item,index) in info.condition_list" :key="index">
              {{index+1}}、{{item}}
            </li>
          </ul>
        </div>
      </div>
      <!--产品介绍-->
      <div class="introduce">
         <div class="introduce_box">
           <h4>产品介绍</h4>
           <p>{{info.introduce}}</p>
         </div>
      </div>
      <!--立即申请-->
      <div class="applyBtn">
        <button>立即申请</button>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import back from '../common/back.vue'
  export default {
    data(){
      return {
       head:''
      }
    },
    created(){
      this._getRecommend();
    },
    methods:{
      _getRecommend() {
        this.info =  {
            "picUrl": "http://y.gtimg.cn/music/photo_new/T003R720x288M000003kGTF00E6oXe.jpg",
            "id": 15055,
            "name":"老张有钱,",
            "detail":"借钱不",
            "money":"121",
            "rate":"0.03",
            "totalRate" :"32",
            "min":"1000",
            "max":"20000",
            "loanMax":"0.5",
            "timeMin":"1",
            "timeMax":"22",
            "loanMin":"0.1",
            "loanMoney":"1000",
            "timeLimit":'7',
            "timeLimitList":['1','2','3','4','5','6','7'],
            "loanN":"1000",
            "introduce":"产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍",
            "condition_list":["年龄18-50周岁","持有中华人民共和国二代身份证"]
          }
      },
    },
    beforeRouteEnter(to,from,next){
      next(vm =>{
        vm.head =  vm.$route.params.name;  //这里获取 id 然后ajax请求
      })
    },
    components:{back}
  }
</script>
<style scoped lang="stylus">
@import "../../common/stylus/variable.styl"
.proInfo
  h4
    font-size $font-size-30
    line-height 88px
  .typeWrap_box
    background-color #ffffff
    padding 34px 46px 0 46px
    border-bottom 1px solid $color-bottom
    .l_detail
      display flex
      align-items center
      justify-content space-between
      padding-bottom 28px
      border-bottom  1px solid $color-bottom
      i
        flex 0 0 64px
        height 64px
        margin-right 45px
        img
          width 100%
          height 100%
      .client
        font-size $font-size-34
        color $color-black
      .l_number
        font-size $font-size-22
        color $color-h
    .l_limit
      display flex
      align-items center
      justify-content space-between
      height 140px
      background-color transparent
      .limit,.rate,.total
        color $color-red
        font-size $font-size-36
        .hint
          margin-top 20px
          color $color-h
          font-size $font-size-22
        background-color transparent

  .loanMoney
    background-color #ffffff
    label
      font-size $font-size-30
      color $color-black
      span
        color $color-h
        padding-left 14px
    .money,.timeLimit
      height 100px
      box-sizing border-box
      border-bottom 1px solid $color-bottom
      .money_box,.timeLimit_box
        display flex
        height 100%
        align-items center
        justify-content space-between
        padding  0 46px
        input
          width 200px
          height 50px
          padding-right 20px
          font-size 32px
          text-align right
          border 1px solid $color-blue
          color $color-blue
        dfn
          font-size $font-size-30
          color $color-black
          font-style normal

      .timeLimit_box
        select
         padding 0 20px
         border none
  .condition,.introduce
    background-color #ffffff
    border-bottom 1px solid $color-bottom
    .condition_box,.introduce_box
      padding 0 46px
      .condition_list
        padding 20px 0
        li
          color $color-h
          line-height 50px
          font-size $font-size-22
  .introduce
    margin-top 30px
    .introduce_box
      p
        line-height 50px

  .applyBtn
    margin-top 100px
    height 100px
    background-color $color-blue
    button
      width 100%
      height 100%
      border none
      color #ffffff
      font-size $font-size-30
      background-color transparent
</style>

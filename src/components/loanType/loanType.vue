<!-- 借款类型 -->
<template>
  <div class="loanType">
    <back :title="titleName"></back>
    <div class="loanType_list" ref="loanType_list">
      <div>
        <div class="top-tip">
          <span class="refresh-hook">{{topTip}}</span>
        </div>
        <div class="refreshAlert" v-show="refreshAlert"><p>刷新成功!</p></div>
        <loan-list :arr="recommends"></loan-list>
        <div class="bottom-tip" v-show="bottomTipJudge">
          <span class="loading-hook">{{bottomTip}}</span>
        </div>
      </div>

    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import back from '../common/back.vue'
  import loanList from '../common/loanList.vue'
  import {initScroll} from '../../common/js/fun'
  import {newCut,IDcardType,notCreditType,daysProductType,clickNumberType,sesamePointsType} from '../../api/api'
  import {baseConfig} from '../../api/config'
  export default {

    data(){
      return {
        topTip:'下拉刷新',
        bottomTip:'查看更多',
        bottomTipJudge:false,
        refreshAlert:false,
        titleName:'',
        page:1,
        recommends:[{}],
        loanTypeList:[]
      }
    },
    created(){
    },
    mounted(){
    },
    methods:{
      responseData(params){
        switch (params.id){
          case 1 :
            initScroll(this,newCut,this.$refs.loanType_list,{page:this.page});
            break;
          case 2 :
            initScroll(this,IDcardType,this.$refs.loanType_list,{page:this.page,state:params.state.state});
            break;
          case 3 :
            initScroll(this,IDcardType,this.$refs.loanType_list,{page:this.page,state:params.state.state});
            break;
          case 4 :  //不上征信
            initScroll(this,notCreditType,this.$refs.loanType_list,{page:this.page});
            break;
          case 8 :   //本周放款王
            initScroll(this,clickNumberType,this.$refs.loanType_list,{page:this.page});
            break;
          case 9 :    //7天贷
            initScroll(this,daysProductType,this.$refs.loanType_list,{page:this.page});
            break;
          default :   //其他的
            initScroll(this,sesamePointsType,this.$refs.loanType_list,{page:this.page,state:params.state.state});
            break;
        }
      }
    },
    beforeRouteEnter(to,from,next){
      next( vm => {
        if (from.name != 'applyPage'){
          vm.page = 1;
          vm.recommends = [];
          let params = vm.$route.params;
          vm.titleName = params.name;
          vm.pageParams = params;
          vm.responseData(vm.pageParams);
        }
      })
    },
    beforeRouteLeave(to,from,next){
      this.scroll.destroy();
      next();
    },
    components:{back,loanList}
  }
</script>
<style scoped lang="stylus">
  @import "../../common/stylus/variable.styl"
  .loanType_list
    width 100%
    position absolute
    overflow hidden
    top 28px
    left 0
    right 0
    bottom 0
    .top-tip,.bottom-tip,.refreshAlert
      height 60px
      line-height 60px
      text-align center
    .refreshAlert
      position absolute
      top 60px
      left 0
      font-size $font-size-30
      color #ffffff
      width 100%
      z-index 5
      background rgba(7, 17, 27, 0.7)
</style>

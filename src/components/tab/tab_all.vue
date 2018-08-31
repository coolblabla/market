<template>
  <div class="proWrap" ref="proWrap">
    <div>
      <div class="top-tip">
        <span class="refresh-hook">{{topTip}}</span>
      </div>
      <div class="refreshAlert" v-show="refreshAlert"><p>刷新成功!</p></div>
      <loanList :arr="recommends"></loanList>
      <div class="bottom-tip" v-show="bottomTipJudge">
        <span class="loading-hook">{{bottomTip}}</span>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import loanList from '../common/loanList.vue'
  import {ProductAllCity} from '../../api/cityApi'
  import {initScroll,responseScroll} from '../../common/js/fun'
  import {proList} from  '../../common/js/fun'
  import {bus} from '../../common/js/bus'
  export default {
    data(){
      return {
        topTip:'下拉刷新',
        bottomTip:'查看更多',
        bottomTipJudge:false,
        refreshAlert:false,
        page:1,

        recommends:[],
      }
    },
    mounted(){
      initScroll(this,ProductAllCity,this.$refs.proWrap,{page:this.page,isLine:this.$router.typeId});
    },
    components:{loanList}
  }
</script>
<style scoped lang="stylus">
  @import "../../common/stylus/variable.styl"
  @import "../../common/stylus/proList.styl"
</style>
